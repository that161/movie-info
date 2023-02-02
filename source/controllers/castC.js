const cast = require('../models/movieM');

class castC {

    async getcast(req, res) {
            let id = req.params.id;
            const list = await cast.selectOneCast(id);
            const listmovie = await cast.selectMovieCast(id);
            let db_listmovie = [];
            let db = [];
            for (let i = 0; i < listmovie.length; i++) {
                if (i % 2 == 0) {
                    db_listmovie.push(listmovie[i]);
                }
            }
            db.push(list[0]);
            res.render('cast.handlebars', {
                casts: db,
                listmovie: db_listmovie,
            });
        }
        // 1234 5678 9
    async gethome(req, res) {
        let id = req.params.id;
        const listmovie = await movie.selectAllMovies();
        let db = [];
        db.push(listmovie[3 * id - 3]);
        db.push(listmovie[3 * id - 2]);
        db.push(listmovie[3 * id - 1]);
        res.render('cast.handlebars', {
            movies: db,
        });
    }


}

module.exports = new castC;