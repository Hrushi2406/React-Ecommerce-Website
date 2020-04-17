const { db, admin } = require('../utils/admin')
const { addressValidator } = require('../utils/validator')

const getUserDocRef = async userId => {
    let userQuery = await db.collection('users').where('userId', '==', userId).get()
    return userQuery.docs[0].ref
}

getData = (arr) => {
    let itemArray = []
    arr.forEach(doc => {
        itemArray.push(doc.data())
    });
    return itemArray
}

exports.mapProductsToUser = async (req, res) => {
    let cartItems = req.body.cartItems
    let userId = req.user.id
    console.log(userId)
    try {
        let userDocRef = await getUserDocRef(userId)
        cartItems.forEach(async (item, i) => {
            await userDocRef.collection('cart').doc(item.productId).set({
                cartItemId: item.productId,
                count: item.count,
                addedAt: admin.firestore.FieldValue.serverTimestamp()
            })
        })
        res.status(200).json({ success: 'Item added to user Cart successfully' })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.fetchCheckoutProducts = async (req, res) => {
    let userId = req.user.id
    try {
        let userQuery = await db.collection('users').where('userId', '==', userId).get()
        let userDocRef = userQuery.docs[0].ref
        let query = await userDocRef.collection('cart').orderBy("addedAt").get()
        let userCartItems = getData(query.docs)
        let productsList = []
        let counter = 0
        console.log(userCartItems)
        userCartItems.forEach(async (item) => {
            console.log(item)
            let response = await db.collection('products').where('productId', '==', item.cartItemId).get()

            if (!response.empty) {
                let product = response.docs[0].data()
                product.count = item.count
                productsList.push(product);
            }
            else {
                res.status(400).json({ errors: 'No such product' })
            }
            counter++
            if (userCartItems.length === counter) {
                console.log(productsList.length)
                res.status(200).json({ productsList })
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getUserDetails = async (req, res) => {
    let userId = req.user.id
    try {
        let response = await db.collection('users').where('userId', '==', userId).get()
        let userData = response.docs[0].data()
        res.status(200).json({ userData })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.addAddress = async (req, res) => {
    let userId = req.user.id
    let userAddress = req.body.userAddress
    console.log(userAddress)
    try {
        let response = await db.collection('users').where('userId', '==', userId).get()
        let userData = response.docs[0].data()
        let arrOfAddress = userData.addressList == null ? [] : userData.addressList
        if (arrOfAddress.indexOf(userAddress) == -1) {
            arrOfAddress.push(userAddress)
            await response.docs[0].ref.update({
                addressList: arrOfAddress,
                defaultAddress: userData.defaultAddress == undefined ? 0 : userData.defaultAddress
            })
            res.status(200).json({ success: 'Address Saved Successfully' })
        }
        else {
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
        let response = await db.collection('users').where('userId', '==', userId).get()
        let userData = response.docs[0].data()
        let arrOfAddress = userData.addressList

        if (arrOfAddress.length > 1) {
            arrOfAddress.splice(index, 1)
            if (userData.defaultAddress === index) {
                await response.docs[0].ref.update({
                    addressList: arrOfAddress,
                    defaultAddress: 0
                })
            } else {
                await response.docs[0].ref.update({
                    addressList: arrOfAddress,
                })
            }
            res.status(200).json({
                success: 'Address removed successfully'
            })
        }
        else {
            await response.docs[0].ref.update({
                addressList: null,
                defaultAddress: null,
            })
            res.status(200).json({
                success: 'Address removed successfully'
            })
        }
        res.status(400).json({
            general: "You cannot delete your last saved address"
        })

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updateDefaultAddress = async (req, res) => {
    let userId = req.user.id
    let defaultAddress = req.body.defaultAddress

    try {
        let response = await db.collection('users').where('userId', '==', userId).get()
        let userData = response.docs[0].data()
        if (userData.defaultAddress === defaultAddress) {
            res.status(200).json({ general: "Already set as default Address" })
        }
        else {
            await response.docs[0].ref.update({
                defaultAddress: defaultAddress
            })
            res.status(200).json({ success: "Update default address" })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}


//381559