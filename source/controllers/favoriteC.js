const movie = require('../models/movieM');

class searchC {

    async post(req, res) {
        const check = await movie.isExistFavoriteMovie(req.body.id);
        if (check == false) {
            const rs = await movie.insertFavoriteMovie(req.body.id);
            res.json({ result: 'success' });
        } else {
            res.json({ result: 'unsuccess' });
        }

    }

    async delete(req, res) {
        const del = await movie.deleteFavoriteMovie(req.body.id);
        res.json({ result: 'success' });
    }

    async get(req, res) {
        let id = req.params.id;
        const listmovie = await movie.selectFavoriteMovie();
        let numberPage;
        if (listmovie.length % 3 == 0) {
            numberPage = listmovie.length / 3;
        } else if (listmovie.length % 3 == 1) {
            numberPage = (listmovie.length + 2) / 3;
        } else {
            numberPage = (listmovie.length + 1) / 3;
        }
        let db = [];
        if (3 * id - 3 < listmovie.length) {
            db.push(listmovie[3 * id - 3]);
        }
        if (3 * id - 2 < listmovie.length) {
            db.push(listmovie[3 * id - 2]);
        }
        if (3 * id - 1 < listmovie.length) {
            db.push(listmovie[3 * id - 1]);
        }

        let db_page = [];
        for (let i = 1; i <= numberPage; i++) {
            db_page.push({ npage: i, id: id });
        }
        res.render('favorite.handlebars', {
            movies: db,
            page: db_page,
        });
    }
}

module.exports = new searchC;