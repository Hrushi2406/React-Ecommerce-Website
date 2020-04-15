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

    //Paginate
    let limit = 8
    let page = parseInt(req.query.page)

    //SORT
    let sortBy = req.query.sortBy
    let sortOrder = req.query.sortOrder === "" ? "asc" : req.query.sortOrder

    //Filter 
    let category1 = req.query.category1
    let category3 = req.query.category3

    console.log(page)
    console.log('Sort Order', sortOrder)
    try {
        var query = db.collection('products').where('category2', '==', key).limit(8).offset(page * limit)

        if (sortBy) {
            console.log('Sort Run')
            query = query.orderBy(sortBy, sortOrder)
        }
        if (category1) {
            console.log('Category1 Run')
            query = query.where("category1", "==", category1)
        }
        if (category3) {
            console.log('Category3 Run')
            query = query.where("category3", "==", category3)
        }

        let finalQuery = await query.get()
        let categoryData = getData(finalQuery.docs)
        let paginateInfo = { key, page, limit, category1, category3, sortBy, orderBy }
        paginateInfo.hasMore = !finalQuery.empty
        res.status(200).json({ categoryData, paginateInfo })
    } catch (err) {
        res.status(500).json(err)
    }
}