const app = require('express');
const router = app.Router();

const signup = require('../controllers/signupC');

router.get('/', signup.getsignup);

router.post('/', signup.postsignup);

module.exports = router;