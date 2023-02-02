const model = require('../models/userM');
const CryptoJS = require('crypto-js');
const hashLength = 64;

class userC {

    async getlogin(req, res) {
        res.render('login.handlebars');
    }

    async postlogin(req, res, next) {
        const un = req.body.username;
        const pw = req.body.password;
        switch (req.body.signin) {
            case 'login':
                {
                    const isexist = await model.isExistUser(un);
                    if (isexist == false) {
                        res.json({ result: 'Username not exist' });
                    } else {
                        const uDb = await model.selectUser(un);
                        const pwDb = uDb[0].Password;
                        const salt = pwDb.slice(hashLength);
                        const pwSalt = pw + salt;
                        const pwHash = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
                        if (pwDb === (pwHash + salt)) {
                            console.log(req.session);
                            return res.json({ result: 'Success', id: uDb[0].id });
                        } else {
                            return res.json({ result: 'Incorrect password' });
                        }
                    }
                }
            case 'reg':
                {
                    try {
                        const AlluDb = await model.selectAllUser();
                        let isexist = false;
                        for (let i = 0; i < AlluDb.length; i++) {
                            if (AlluDb[i].Username == req.body.username) {
                                isexist = true;
                            }
                        }
                        if (isexist == false) {
                            const salt = Date.now().toString(16);
                            const pwSalt = req.body.password + salt;
                            const pwHash = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);

                            const obj = {
                                id: await model.selectMaxID() + 1,
                                username: req.body.username,
                                password: pwHash + salt,
                            }
                            const uNew = await model.addUser(obj);
                            return res.json({ result: 'Đăng ký thành công' });
                        } else {
                            return res.json({ result: 'Tài khoản đã tồn tại' });
                        }
                    } catch (error) {
                        next(error);
                    }
                }
            case 'logout':
                {
                    delete req.session.uid;
                    return res.json({ result: 'logout successfully' });
                }
        }


    }

}
module.exports = new userC;