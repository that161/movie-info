const app = require('express');
const router = app.Router();

const cast = require('../controllers/castC');

router.get('/id=:id', cast.getcast);

module.exports = router;