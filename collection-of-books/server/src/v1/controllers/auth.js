const User = require("../models/user");
const CryptoJS = require("crypto-js");

//新規登録
exports.registerUser = async (req, res) => {
    //パスワードを受け取る
    const password = req.body.password;
    try {
        //パスワードの暗号化
        req.body.password = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY).toString();
        //ユーザー新規作成
        const user = await User.create(req.body);
        return res.status(200).json({ msg: '登録に成功しました！' });
    } catch (error) {
        return res.status(500).json(error);
    }
}

//ログイン
exports.loginUser = async (req, res) => {
    //ユーザー名とパスワードを受け取る
    const { username, password } = req.body;
    try {
        //ユーザー名が登録されているかを確認
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                errors: [
                    {
                        param: 'username',
                        msg: 'ユーザー名が無効です'
                    },
                ],
            })
        }

        //パスワードを照合
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET_KEY,
        ).toString(CryptoJS.enc.Utf8);

        if (hashedPassword !== password) {
            return res.status(401).json({ 
                errors: [
                    {
                        param: 'password',
                        msg: 'パスワードが一致しません' 
                    },
                ],
            });
        }
        return res.status(200).json({ msg: 'ログインに成功しました！' })

    } catch (error) {
        return res.status(500).json(error);
    }
}