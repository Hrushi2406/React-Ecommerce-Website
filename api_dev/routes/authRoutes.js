const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()


const { validator } = require('../utils/validator')
const { db } = require('../utils/admin')

//LOGIN ROUTE
exports.login = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }
    let errors = {}
    try {
        const { error, valid } = validator(user)
        errors = error;
        if (!valid) {
            throw errors;
        }
        let response = await db.collection('users').where('email', '==', user.email).get()
        if (response.empty) {
            errors.email = "This user doesn't exist";
            throw errors
        }
        let data = response.docs[0].data()
        let result = await bcrypt.compare(user.password, data.password);
        if (result) {
            var token = jwt.sign({ id: data.userId }, process.env.ACCESS_TOKEN_SECRET)
        } else {
            errors.password = "Password is Incorrect"
            throw errors
        }
        res.status(200).json({ token: token, auth: result, userData: data })
    } catch (error) {
        res.status(500).json({ errors: errors })
    }
}   