const { db, admin } = require('../utils/admin')
const { addressValidator } = require('../utils/validator')
const { getData, getProducts, mapCountToUserCartProduct } = require('../utils/functions')

const { getUserById, getUserCartItems, deletePrevCartItems, addItemsToCart, getCountForEachItem, addUserAddress, addProductsToOrders, addProductsToOrderDetails, decreaseStock } = require('../utils/query/userQuery')
const { userInterpolation, productInterpolation } = require('../utils/changeDataInterpolation')


const Razorpay = require('razorpay')


const getUserDocRef = async userId => {
    let userQuery = await db.collection('users').where('userId', '==', userId).get()
    return userQuery.docs[0].ref
}


getDocRef = (arr) => {
    let itemArray = []
    arr.forEach(doc => {
        itemArray.push(doc.ref)
    });
    return itemArray
}

exports.mapProductsToUser = async (req, res) => {
    let cartItems = req.body.cartItems
    let userId = req.user.id
    try {
        await db.query(deletePrevCartItems(userId))
        cartItems.forEach(async item => {
            console.log(item.count)

            let response = await db.query(addItemsToCart(userId, item))
        })
        res.status(200).json({ success: 'Item added to user Cart successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.fetchCheckoutProducts = async (req, res) => {
    let userId = req.user.id
    try {
        let userCartProducts = await db.query(getUserCartItems(userId))
        let cartCount = await db.query(getCountForEachItem(userId))
        let productsList = productInterpolation(mapCountToUserCartProduct(userCartProducts.rows, cartCount.rows));
        res.status(200).json({ productsList })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getUserDetails = async (req, res) => {
    let userId = req.user.id
    try {
        let response = await db.query(getUserById(userId))
        let userData = userInterpolation(response.rows[0])
        res.status(200).json({ userData })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.addAddress = async (req, res) => {
    let userId = req.user.id
    let userAddress = req.body.userAddress
    try {

        let response = await db.query(getUserById(userId))
        let user = response.rows[0]
        let userAddressList = user.addresslist == null ? [] : user.addresslist
        let defaultAddress = user.defaultaddress == null ? 0 : user.defaultaddress

        if (userAddressList.indexOf(userAddress) == -1) {
            userAddressList.push(userAddress);
            await db.query(addUserAddress(userId, userAddressList, defaultAddress))
            res.status(200).json({ success: 'Address Saved Successfully' })
        } else {
            res.status(400).json({ general: 'Address already exists' })
        }

    } catch (err) {
        res.status(500).json(err)
    }
}


exports.deleteAddress = async (req, res) => {
    let userId = req.user.id
    let index = req.body.index
    try {
        let response = await db.query(getUserById(userId))
        let user = response.rows[0]
        let arrOfAddress = user.addresslist == null ? [] : user.addresslist
        let defaultAddress = user.defaultaddress == null ? 0 : user.defaultaddress

        if (arrOfAddress.length > 1) {
            arrOfAddress.splice(index, 1)
            if (user.defaultaddress === index) {
                await db.query(addUserAddress(userId, arrOfAddress, 0))
            } else {
                if (arrOfAddress.length - 1 < defaultAddress) {
                    defaultAddress = arrOfAddress.length - 1
                }
                await db.query(addUserAddress(userId, arrOfAddress, defaultAddress))

            }
            res.status(200).json({
                success: 'Address removed successfully'
            })
        } else if (arrOfAddress.length == 1) {
            arrOfAddress.splice(index, 1)
            await db.query(addUserAddress(userId, null, null))
            res.status(200).json({
                success: 'Address removed successfully'
            })
        }
        else {
            res.status(400).json({
                general: "You don't have any address to remove"
            })
        }


    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updateDefaultAddress = async (req, res) => {
    let userId = req.user.id
    let defaultAddress = req.body.defaultAddress
    try {
        let response = await db.query(getUserById(userId))
        let user = response.rows[0]
        if (user.defaultaddress === defaultAddress) {
            res.status(200).json({ general: "Already set as default Address" })
        }
        else {
            await db.query(addUserAddress(userId, user.addresslist, defaultAddress))
            res.status(200).json({ success: "Update default address" })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}


exports.placeOrder = async (req, res) => {
    let userId = req.user.id
    let paymentMethod = req.body.paymentMethod
    try {

        let cartCount = await db.query(getCountForEachItem(userId))

        let response = await db.query(getUserById(userId))
        let userData = response.rows[0]

        let query = await db.query(getUserCartItems(userId))
        let userCartItems = query.rows
        let counter = 0

        //Fetch Products 
        let arrOfProducts = productInterpolation(mapCountToUserCartProduct(userCartItems, cartCount.rows));

        //Check Payment Type
        const getYouPay = (arr) => arr.map((item) => item.count * (item.discounted_price)).reduce((prev, curr) => curr + prev, 0)

        let data = {
            userDetails: userData,
            paymentMethod: paymentMethod,
            amount: getYouPay(arrOfProducts),
            status: 'pending',
            deliveryAt: userData.addresslist[userData.defaultaddress],
        }

        console.log(arrOfProducts.length)

        const addOrdersToDatabase = () => new Promise(async (resolve, reject) => {
            var nextOrder = await db.query("Select nextval(pg_get_serial_sequence('orders', 'orderid')) as new_id")
            var orderId = nextOrder.rows[0].new_id

            arrOfProducts.forEach(async product => {
                if (product.stock >= product.count) {
                    //BEGIN
                    await db.query("BEGIN")

                    //ADD TO ORDERS TABLE
                    await db.query(addProductsToOrders(orderId, userId, product))
                    //ADD TO ORDER DETAILS
                    //DECREASE ITEM STOCK
                    await db.query(decreaseStock(product))
                    //COMMIT
                    await db.query('COMMIT')

                } else {
                    reject({ general: product.title + " product is currently out of stock" })
                    return
                }
                counter++
                if (counter === arrOfProducts.length) {
                    await db.query(addProductsToOrderDetails(orderId, data))
                    await db.query(deletePrevCartItems(userId))
                    resolve({ success: 'Your Order has been placed successfully' })
                }
            })
        })

        if (paymentMethod === 'cod') {
            let response = await addOrdersToDatabase()
            if (response) {
                res.status(200).json(response)
            }
        }
        else if (paymentMethod == "razorpay") {
            data.status = 'paid'
            let response = await addOrdersToDatabase()
            if (response) {
                res.status(200).json(response)
            }
        }
        else {
            res.status(400).json({ general: "No Payment Method provided" })
        }



    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}



exports.payWithRazorpay = async (req, res) => {
    var instance = new Razorpay({ key_id: 'rzp_test_iG70itVrJp7Yhw', key_secret: 'M5nimokuCZa9QMvDU4TRCKaz' })
    let userId = req.user.id
    try {

        let userQuery = await db.query(getUserById(userId))
        let userData = userQuery.rows[0]
        let userCartProducts = await db.query(getUserCartItems(userId))
        let cartCount = await db.query(getCountForEachItem(userId))
        let arrOfProducts = productInterpolation(mapCountToUserCartProduct(userCartProducts.rows, cartCount.rows));

        const getYouPay = (arr) => arr.map((item) => item.count * (item.discounted_price)).reduce((prev, curr) => curr + prev, 0)

        //Create Order
        instance.orders.create({
            amount: getYouPay(arrOfProducts) * 100,
            currency: 'INR',
            receipt: 100 * Math.random(),
            payment_capture: 1,
        }).then(order => {
            order.key = instance.key_id
            res.status(200).json({ order, userData })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }



}




//381559