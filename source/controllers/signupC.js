const model = require('../models/userM');
const CryptoJS = require('crypto-js');
const hashLength = 64;

class userC {

    getsignup(req, res) {
        res.render('signup.handlebars');
    }

    async postsignup(req, res, next) {

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
                    username: req.body.username,
                    password: pwHash + salt,
                }
                const uNew = await model.addUser(obj);
                res.json({ result: 'success' });
                next();
            } else {
                res.json({ result: 'unsuccess' });
                next();
            }
        } catch (error) {
            next(error);
        }


    }

}
module.exports = new userC;