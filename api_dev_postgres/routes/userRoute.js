const { db, admin } = require('../utils/admin')
const { addressValidator } = require('../utils/validator')
const { getData, getProducts, mapCountToUserCartProduct } = require('../utils/functions')

const { getUserById, getUserCartItems, deletePrevCartItems, addItemsToCart, getCountForEachItem, addUserAddress } = require('../utils/query/userQuery')
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
    console.log(userId)
    try {
        await db.query(deletePrevCartItems(userId))
        cartItems.forEach(async item => {
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
        let response = await db.collection('users').where('userId', '==', userId).get()
        let userData = response.docs[0].data()
        let userDocRef = response.docs[0].ref

        let query = await userDocRef.collection('cart').get()
        let userCartItems = getData(query.docs)
        let counter = 0

        //Fetch Products 
        const { arrOfProducts, errors } = await getProducts(userCartItems)
        //Check Payment Type
        const getYouPay = (arr) => arr.map((item) => item.count * (item.discounted_price)).reduce((prev, curr) => curr + prev, 0)

        let data = {
            userDetails: userData,
            paymentDetails: {
                paymentMethod: paymentMethod,
                amount: getYouPay(arrOfProducts),
                status: 'pending'
            },
            deliveryAt: userData.addressList[userData.defaultAddress],
            orderedAt: admin.firestore.FieldValue.serverTimestamp()
        }

        addOrdersToDatabase = () => new Promise((resolve, reject) => {
            let orderCollectionRef = db.collection('orders').doc()

            data.orderId = orderCollectionRef.id

            const batch = db.batch()

            arrOfProducts.forEach(async product => {

                if (product.stock >= product.count) {
                    //Add data to orders collection
                    batch.set(orderCollectionRef, data)
                    //decrease stock
                    let productRef = db.collection('products').doc(product.productId)
                    batch.update(productRef, { stock: admin.firestore.FieldValue.increment(-product.count) })

                    //Add products to user order
                    let ordersRef = userDocRef.collection('orders').doc()
                    product.orderId = orderCollectionRef.id
                    batch.set(ordersRef, product)

                    //Add product to orders collection
                    let productDocRef = orderCollectionRef.collection('orderedItems').doc()

                    batch.set(productDocRef, product)
                }
                else {
                    reject({ general: product.title + " product is currently out of stock" })
                    return
                }
                counter++
                console.log(counter, product.title)
                if (counter === arrOfProducts.length) {
                    await batch.commit()
                    await deleteCartCollection(userDocRef)
                    resolve({ success: 'Your Order has been placed successfully' })
                }
            })
        })



        if (paymentMethod === 'cod') {
            let response = await addOrdersToDatabase()
            console.log(response)
            if (response) {
                res.status(200).json(response)
            }
        }
        else if (paymentMethod == "razorpay") {
            let paymentInfo = req.body.paymentDetails
            data.paymentDetails.status = 'paid'
            data.paymentDetails.info = paymentInfo
            let response = await addOrdersToDatabase()
            console.log(response)
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

deleteCartCollection = async (userDocRef) => {

    let cartItemsQuery = await userDocRef.collection('cart').get()

    let cartItemsDocRef = getDocRef(cartItemsQuery.docs)
    let counter = 0
    if (cartItemsDocRef.length === 0) {
        return { success: 'No Document in cart' }
    }
    else {
        return new Promise((resolve, reject) => {
            cartItemsDocRef.map(async doc => {
                try {
                    await doc.delete()
                    counter++
                    if (cartItemsDocRef.length === counter) {
                        console.log("Deleted Successfully")
                        resolve({ success: 'Deleted Succesfully' })
                    }
                } catch (err) {
                    console.log(err)
                    reject(err)
                }

            })
        })
    }

}






exports.payWithRazorpay = async (req, res) => {
    var instance = new Razorpay({ key_id: 'rzp_test_iG70itVrJp7Yhw', key_secret: 'M5nimokuCZa9QMvDU4TRCKaz' })
    let userId = req.user.id
    try {
        let response = await db.collection('users').where('userId', '==', userId).get()
        let userData = response.docs[0].data()
        let userDocRef = response.docs[0].ref

        let query = await userDocRef.collection('cart').get()
        let userCartItems = getData(query.docs)

        const { arrOfProducts, errors } = await getProducts(userCartItems)

        const getYouPay = (arr) => arr.map((item) => item.count * (item.discounted_price)).reduce((prev, curr) => curr + prev, 0)

        //Create Order
        instance.orders.create({
            amount: getYouPay(arrOfProducts) * 100,
            currency: 'INR',
            receipt: 100 * Math.random(),
            payment_capture: 1,
        }).then(order => {
            console.log(order)
            order.key = instance.key_id
            res.status(200).json({ order, userData })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }



}


exports.paymentSuccess = (req, res) => {
    console.log(req)
}


//381559