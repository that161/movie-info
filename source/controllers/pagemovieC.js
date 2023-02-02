const movie = require('../models/movieM');

class pagemovieC {

    async pagemovie(req, res) {
        let id = req.params.id;
        const m_movie = await movie.selectOneMovie(id);
        let db = [];
        db.push(m_movie[0]);
        const m = await movie.selectSynopses(id);
        res.render('pagemovie.handlebars', {
            movies: db,
            Synopses: m,
        });
    }

    async reviews(req, res) {
        let id = req.params.id;
        let page = req.params.page;
        const reviews = await movie.selectReviews(id);
        let numberPage;
        if (reviews.length % 3 == 0) {
            numberPage = reviews.length / 3;
        } else if (reviews.length % 3 == 1) {
            numberPage = (reviews.length + 2) / 3;
        } else {
            numberPage = (reviews.length + 1) / 3;
        }
        const m_movie = await movie.selectOneMovie(id);
        let db_m = [];
        db_m.push(m_movie[0]);
        let db = [];
        db.push(reviews[3 * page - 3]);
        db.push(reviews[3 * page - 2]);
        db.push(reviews[3 * page - 1]);
        let db_page = [];
        for (let i = 1; i <= numberPage; i++) {
            db_page.push({ npage: i, id: id });
        }
        res.render('review.handlebars', {
            movies: db_m,
            reviews: db,
            page: db_page,
        });
    }

    async casts(req, res) {
        let id = req.params.id;
        const casts = await movie.selectCastsMovie(id);
        const m_movie = await movie.selectOneMovie(id);
        res.render('castmovie.handlebars', {
            movies: m_movie,
            casts: casts,
        });
    }


}

module.exports = new pagemovieC;