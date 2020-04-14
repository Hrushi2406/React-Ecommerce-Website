const { db } = require("../utils/admin");

getData = (arr) => {
    let itemArray = []
    arr.forEach(doc => {
        itemArray.push(doc.data())
    });
    return itemArray
}

exports.home = async (req, res) => {
    let productData = {}
    try {
        let jacketsQuery = await db.collection('products').where('category2', '==', 'jackets').limit(4).get()
        let bagsQuery = await db.collection('products').where('category2', '==', 'bags').limit(4).get()
        let walletsQuery = await db.collection('products').where('category2', '==', 'wallets').limit(4).get()
        let beltsQuery = await db.collection('products').where('category2', '==', 'belts').limit(4).get()

        productData.jackets = getData(jacketsQuery.docs)
        productData.wallets = getData(walletsQuery.docs)
        productData.bags = getData(bagsQuery.docs)
        productData.belts = getData(beltsQuery.docs)
        res.status(200).json({ productData })

    } catch (err) {
        res.status(500).json(err)
    }
}


exports.viewAll = async (req, res) => {
    let categoryData = []
    let key = req.params.key
    let page = parseInt(req.query.page)
    let limit = 8
    console.log(page)
    try {
        let paginateQuery = await db.collection('products').where('category2', '==', key).limit(8).offset(page * limit).get()
        categoryData = getData(paginateQuery.docs)
        paginateInfo = { key, page, limit }

        paginateInfo.hasMore = !paginateQuery.empty
        res.status(200).json({ categoryData, paginateInfo })
    } catch (err) {
        res.status(500).json(err)
    }
}