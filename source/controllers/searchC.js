const movie = require('../models/movieM');

class searchC {
    async getMoviesearch(req, res) {
        let input = req.params.input;
        let page = req.params.page;
        const rs = await movie.selectMoviebyName(input);
        let numberPage;
        if (rs.length % 3 == 0) {
            numberPage = rs.length / 3;
        } else if (rs.length % 3 == 1) {
            numberPage = (rs.length + 2) / 3;
        } else {
            numberPage = (rs.length + 1) / 3;
        }

        let db_page = [];
        for (let i = 1; i <= numberPage; i++) {
            db_page.push({ npage: i, input: input });
        }
        let db = [];
        if (3 * page - 3 < rs.length) {
            db.push(rs[3 * page - 3]);
        }
        if (3 * page - 2 < rs.length) {
            db.push(rs[3 * page - 2]);
        }
        if (3 * page - 1 < rs.length) {
            db.push(rs[3 * page - 1]);
        }
        res.render('searchMovie.handlebars', {
            movies: db,
            page: db_page,
        });
    }

    async getCastsearch(req, res) {
        let input = req.params.input;
        let page = req.params.page;
        const rs = await movie.selectCastbyName(input);
        let numberPage;
        if (rs.length % 3 == 0) {
            numberPage = rs.length / 3;
        } else if (rs.length % 3 == 1) {
            numberPage = (rs.length + 2) / 3;
        } else {
            numberPage = (rs.length + 1) / 3;
        }

        let db_page = [];
        for (let i = 1; i <= numberPage; i++) {
            db_page.push({ npage: i, input: input });
        }
        let db = [];
        if (3 * page - 3 < rs.length) {
            db.push(rs[3 * page - 3]);
        }
        if (3 * page - 2 < rs.length) {
            db.push(rs[3 * page - 2]);
        }
        if (3 * page - 1 < rs.length) {
            db.push(rs[3 * page - 1]);
        }
        res.render('searchCast.handlebars', {
            casts: db,
            page: db_page
        });
    }

    async postsearch(req, res) {
        if (req.body.option == "Search by movies") {
            const rs = await movie.selectMoviebyName(req.body.input);
            if (rs.length == 0) {
                res.json({ result: 'nodata' });
            } else {
                res.json({ result: 'success' });
            }
        } else if (req.body.option == "Search by casts") {
            const rs = await movie.selectCastbyName(req.body.input);
            if (rs.length == 0) {
                res.json({ result: 'nodata' });
            } else {
                res.json({ result: 'ok' });
            }
        }
    }

}


module.exports = new searchC;