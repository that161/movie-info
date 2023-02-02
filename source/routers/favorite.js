const app = require('express');
const router = app.Router();

const favoriteC = require('../controllers/favoriteC');

router.get('/page=:id', favoriteC.get);

router.post('/', favoriteC.post);

router.post('/delete', favoriteC.delete);

module.exports = router;