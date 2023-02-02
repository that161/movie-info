const app = require('express');
const router = app.Router();

const home = require('../controllers/homeC');

router.get('/page=:id', home.gethome);

module.exports = router;