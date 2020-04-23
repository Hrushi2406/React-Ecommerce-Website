const { db } = require('../admin')


exports.getUserByEmail = (email) => {
    return query = {
        text: "SELECT * FROM users WHERE email = $1",
        values: [email]
    }
}

exports.signUpUser = (user) => {
    return query = {
        text: "INSERT INTO users( name, email, password, dob, mobile) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        values: [user.name, user.email, user.password, user.dob, user.mobile]
    }
}

exports.getUserById = id => {
    return query = {
        text: "SELECT * FROM users WHERE userid = $1",
        values: [id]
    }
}

exports.getUserCartItems = id => {
    return query = {
        text: "SELECT * FROM products WHERE productid IN (SELECT productid FROM cart WHERE userid = $1)",
        values: [id]
    }
}

exports.deletePrevCartItems = id => {
    return query = {
        text: "DELETE FROM cart WHERE userid = $1",
        values: [id]
    }
}

exports.getCountForEachItem = id => {
    return query = {
        text: "SELECT productid,count FROM cart WHERE userid = $1",
        values: [id]
    }
}

exports.addItemsToCart = (userId, item) => {
    return query = {
        text: "INSERT INTO cart (userid, productid, count) VALUES ($1, $2, $3)",
        values: [userId, item.productId, item.count]
    }
}

exports.addUserAddress = (userId, addressList, defaultaddress) => {
    return query = {
        text: "UPDATE users SET addresslist = $1, defaultaddress = $2 WHERE userid = $3 ",
        values: [addressList, defaultaddress, userId]
    }
}

exports.addProductsToOrders = (orderId, userId, product) => {
    return query = {
        text: "INSERT INTO orders (orderid, userid, productid) VALUES ($1, $2, $3)",
        values: [orderId, userId, product.productId]
    }
}


exports.addProductsToOrderDetails = (orderId, data) => {
    return query = {
        text: "INSERT INTO orderDetails (orderid, deliveryat, paymentmethod, amount, status) VALUES ($1, $2, $3, $4, $5)",
        values: [orderId, data.deliveryAt, data.paymentMethod, data.amount, data.status]
    }
}

exports.decreaseStock = (product) => {
    return query = {
        text: "UPDATE products SET stock = (SELECT stock FROM products WHERE productid = $1) - $2 ",
        values: [product.productId, product.count]
    }
}