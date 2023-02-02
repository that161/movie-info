const app = require('express');
const router = app.Router();

const searchC = require('../controllers/searchC');

router.get('/movie/:input/page=:page', searchC.getMoviesearch);

router.get('/cast/:input/page=:page', searchC.getCastsearch);

router.post('/', searchC.postsearch);

module.exports = router;