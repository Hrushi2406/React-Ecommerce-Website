const { db } = require('./admin')

exports.getData = (arr) => {
    let itemArray = []
    arr.forEach(doc => {
        itemArray.push(doc.data())
    });
    return itemArray
}

module.exports.getProducts = async (arrOfCartItems) => {
    let arrOfProducts = []
    let counter = 0
    let errors = {}
    return new Promise((resolve, reject) => {
        if (arrOfCartItems.length === 0) {
            reject(errors.general = "You don't have items in your cart")
        }
        arrOfCartItems.map(async (item) => {
            try {
                let response = await db.collection('products').where('productId', '==', item.cartItemId).get()
                if (!response.empty) {
                    let product = response.docs[0].data()
                    product.count = item.count
                    arrOfProducts.push(product);
                }
                else {
                    errors.general = "No such Product of ID" + item.cartItemId
                }
                counter++
                if (counter === arrOfCartItems.length) {
                    resolve({ arrOfProducts, errors })
                }
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
        // p.then(r => console.log(r))
    })


}





exports.mapCountToUserCartProduct = (cartProducts, prodCount) => {
    cartProducts.forEach(prod => {
        let product = prodCount.filter(count => count.productid = prod.productid)[0]
        prod.count = product.count
    })
    return cartProducts
}