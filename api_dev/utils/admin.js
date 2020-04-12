const admin = require('firebase-admin')
const serviceAccount = require('../config/leather-b123b-firebase-adminsdk-9hly7-37409f58ce.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://leather-b123b.firebaseio.com"
});

const db = admin.firestore()

module.exports = { admin, db }