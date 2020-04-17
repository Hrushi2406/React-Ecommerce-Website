const { db } = require('./admin')

exports.getData = (arr) => {
    let itemArray = []
    arr.forEach(doc => {
        itemArray.push(doc.data())
    });
    return itemArray
}

exports.getProductsFromArrOfId = async (arrOfId) => {
    let arrofProducts = []
    arrOfId.forEach(async (id, index) => {
        try {
            let response = await db.collection('products').where('productId', '==', id).get()
            console.log(response.docs.length)
            if (!response.empty) {
                console.log("isNotEmpty")

                let product = response.docs[0].data()
                arrofProducts.push(product);
            }
            else if (arrOfId.length == index + 1) {
                console.log("final")

                return arrofProducts
            }
            else {
                console.log("ERR2")

                return 'No such product'
            }
        } catch (err) {
            console.log("ERR")
            return err
        }
    })
}