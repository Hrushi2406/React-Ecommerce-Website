const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()


const { loginValidator, signUpValidator } = require('../utils/validator')
const { db } = require('../utils/admin')

//LOGIN ROUTE
exports.login = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }
    let errors = {}
    try {
        const { error, valid } = loginValidator(user)
        errors = error;
        console.log(errors)

        if (!valid) {
            res.status(400).json(errors)
        }
        let response = await db.collection('users').where('email', '==', user.email).get()
        if (response.empty) {
            errors.email = "This user doesn't exist";
            res.status(400).json(errors)
        }
        let data = response.docs[0].data()
        let result = await bcrypt.compare(user.password, data.password);
        if (result) {
            var token = jwt.sign({ id: data.userId }, process.env.ACCESS_TOKEN_SECRET)
        } else {
            errors.password = "Password is Incorrect"
            res.status(400).json(errors)
        }
        res.status(200).json({ token: token, auth: result, userData: data })
    } catch (error) {
        res.status(500).json({ errors: error.code })
    }
}


//Sign Up Route
exports.signUp = async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        dob: req.body.dob,
        mobile: req.body.mobile
    }
    let errors = {}

    try {
        const { error, valid } = signUpValidator(user)
        errors = error;
        if (!valid) {
            res.status(400).json(errors)
        }
        let response = await db.collection('users').where('email', '==', user.email).get()
        if (response.empty) {
            user.password = await bcrypt.hash(user.password, 10)
            delete user.confirmPassword;
            let userResponse = await db.collection('users').add(user)
            await userResponse.update({ userId: userResponse.id })
            let userQuery = await userResponse.get();
            let data = userQuery.data();
            let token = jwt.sign({ id: data.userId }, process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json({ token: token, auth: true, userData: data })
        }
        else {
            error.email = 'This user already exists'
            res.status(400).json(errors)
        }
    } catch (error) {
        res.status(500).json({ errors: error.code })
    }
}