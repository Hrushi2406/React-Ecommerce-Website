const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');

//Routes Import
const { login, signUp, test } = require('./routes/authRoutes')
const { home, viewAll, fetchProductById } = require('./routes/dataRoutes')
const { mapProductsToUser, fetchCheckoutProducts, getUserDetails, addAddress, deleteAddress, updateDefaultAddress, placeOrder, payWithRazorpay, paymentSuccess } = require('./routes/userRoute')
//Middleware
const verifyAuth = require('./utils/authMiddleware')

var app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(cors())


//PORT
const PORT = process.env.PORT || 7000





//ROUTES
app.post('/api/login', login)
app.post('/api/signUp', signUp)
app.get('/api/', home)
app.get('/api/products/:key', viewAll)
app.get('/api/fetchProducts', fetchProductById)
app.get('/api/userDetails', verifyAuth, getUserDetails)
app.get('/api/checkoutProducts', verifyAuth, fetchCheckoutProducts)
app.post('/api/mapProductsToUser', verifyAuth, mapProductsToUser)
app.post('/api/addAddress', verifyAuth, addAddress)
app.post('/api/deleteAddress', verifyAuth, deleteAddress)
app.post('/api/updateDefaultAddress', verifyAuth, updateDefaultAddress)

app.post('/api/placeOrder', verifyAuth, placeOrder)
app.post('/api/payWithRazorpay', verifyAuth, payWithRazorpay)
app.post('/api/paymentSuccess', verifyAuth, paymentSuccess)
// app.get('/api/paymentFailure', verifyAuth, paymentFailure)

app.get('/test', test)

//SERVER
app.listen(PORT, () => console.log("Api's Up and Running"))