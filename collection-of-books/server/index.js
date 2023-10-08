const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const PORT = 5000;

//DB接続
try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("DBと接続中");
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log(`サーバーPORT${PORT}を起動中`);
})