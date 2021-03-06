const { db } = require('../admin')

exports.getJacketsLimit4 = () => {
    return query = {
        text: "SELECT * FROM products WHERE category2 = 'jackets' LIMIT 4",
    }
}

exports.getBagsLimit4 = () => {
    return query = {
        text: "SELECT * FROM products WHERE category2 = 'bags' LIMIT 4",
    }
}

exports.getWalletsLimit4 = () => {
    return query = {
        text: "SELECT * FROM products WHERE category2 = 'wallets' LIMIT 4",
    }
}

exports.getBeltsLimit4 = () => {
    return query = {
        text: "SELECT * FROM products WHERE category2 = 'belts' LIMIT 4",
    }
}

exports.getProductById = id => {
    return query = {
        text: "SELECT * FROM products WHERE productid = $1",
        values: [id]
    }
}