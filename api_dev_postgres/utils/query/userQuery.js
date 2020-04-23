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
        text: "(SELECT * FROM products WHERE productid IN (SELECT productid FROM cart WHERE userid = $1))",
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
        text: "SELECT count FROM cart WHERE userid = $1",
        values: [id]
    }
}

exports.addItemsToCart = (userId, item) => {
    return query = {
        text: "INSERT INTO cart (userid, productid, count) VALUES ($1, $2, $3)",
        values: [userId, item.productId, item.count]
    }
}
