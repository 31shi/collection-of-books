const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")

//ユーザー新規登録
router.post('/register', authController.registerUser);

//ユーザーログイン
router.post('/login', authController.loginUser);

module.exports = router;
