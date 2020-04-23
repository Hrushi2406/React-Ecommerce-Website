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