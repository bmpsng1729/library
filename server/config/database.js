const mongoose = require("mongoose");
require("dotenv").config();
 const MONGODB_URL = process.env.MONGODB_URL;
 console.log(MONGODB_URL);
exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};