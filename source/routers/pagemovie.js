const app = require('express');
const router = app.Router();

const pagemovie = require('../controllers/pagemovieC');

router.get('/id=:id', pagemovie.pagemovie);

router.get('/id=:id/reviews/page=:page', pagemovie.reviews);

router.get('/id=:id/casts', pagemovie.casts);

module.exports = router;