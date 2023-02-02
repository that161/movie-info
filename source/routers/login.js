const app = require('express');
const router = app.Router();

const login = require('../controllers/loginC');

router.get('/', login.getlogin);

router.post('/', login.postlogin);

module.exports = router;