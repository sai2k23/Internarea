const admin = require('firebase-admin');
require('dotenv').config();
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK); // Adjust the path if needed

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://internarea-4c2b9.appspot.com' // Replace with your Firebase storage bucket name
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
