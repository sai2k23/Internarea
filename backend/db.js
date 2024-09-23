const mongoose = require("mongoose");
require('dotenv').config();

const DATABASE = process.env.DATABASEURL;

module.exports.connect = async () => {
    try {
        await mongoose.connect(DATABASE);
        console.log("Database is connected");
    } catch (error) {
        console.error("Error connecting to the database", error);
    }
};
