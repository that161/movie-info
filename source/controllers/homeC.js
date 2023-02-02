const movie = require('../models/movieM');

class homeC {

    async gethome(req, res, next) {


        try {
            const checkMovie = await movie.isemptydbMovies();
            const checkCasts = await movie.isemptydbCasts();
            const checkCastsMovie = await movie.isemptydbCastsMovie();
            const checkReview = await movie.isemptydbReviews();
            const checkSynopses = await movie.isemptydbSynopses();

            const rs = require('../db/movies.json');
            const rs1 = require('../db/casts.json');


            if (checkMovie == true) {
                for (let i = 0; i < rs.length; i++) {
                    let obj = {
                        id: rs[i].id,
                        img: rs[i].img,
                        title: rs[i].title,
                        year: rs[i].year,
                        topRank: rs[i].topRank,
                        rating: rs[i].rating,
                        ratingCount: rs[i].ratingCount,
                        genres: rs[i].genres,
                    }
                    const uNew = await movie.insertMovies(obj);
                }
            }

            if (checkCastsMovie == true) {
                for (let i = 0; i < rs.length; i++) {
                    for (let j = 0; j < rs[i].casts.length; j++) {
                        let obj = {
                            id_movie: rs[i].id,
                            id_casts: rs[i].casts[j].id,
                            name: rs[i].casts[j].name,
                            characters: rs[i].casts[j].characters,
                        }
                        const uNew = await movie.insertCastsMovie(obj);
                    }
                }
            }

            if (checkSynopses == true) {
                for (let i = 0; i < rs.length; i++) {
                    let obj = {
                        id_movie: rs[i].id,
                        hasProfanity: rs[i].synopses[0].hasProfanity,
                        language: rs[i].synopses[0].language,
                        text: rs[i].synopses[0].text,
                    }
                    const uNew = await movie.insertSynopses(obj);

                }
            }

            if (checkReview == true) {
                for (let i = 0; i < rs.length; i++) {
                    for (let j = 0; j < rs[i].reviews.length; j++) {
                        let obj = {
                            id_movie: rs[i].id,
                            author: rs[i].reviews[j].author,
                            authorRating: rs[i].reviews[j].authorRating,
                            helpfulnessScore: rs[i].reviews[j].helpfulnessScore,
                            languageCode: rs[i].reviews[j].languageCode,
                            reviewText: rs[i].reviews[j].reviewText,
                            reviewTitle: rs[i].reviews[j].reviewTitle,
                            submissionDate: rs[i].reviews[j].submissionDate,
                        }
                        const uNew = await movie.insertReviews(obj);
                    }
                }
            }

            if (checkCasts == true) {
                for (let i = 0; i < rs1.length; i++) {
                    let obj = {
                        id: rs1[i].id,
                        image: rs1[i].image,
                        legacyNameText: rs1[i].legacyNameText,
                        name: rs1[i].name,
                        birthDate: rs1[i].birthDate,
                        birthPlace: rs1[i].birthPlace,
                        gender: rs1[i].gender,
                        heightCentimeters: rs1[i].heightCentimeters,
                        nicknames: rs1[i].nicknames,
                        realName: rs1[i].realName,

                    }
                    const uNew = await movie.insertCasts(obj);
                }
            }

            let id = req.params.id;
            const listmovie = await movie.selectMoviesRating();
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
            for (let i = 1; i <= 4; i++) {
                db_page.push({ npage: i, id: id });
            }

            res.render('home.handlebars', {
                movies: db,
                page: db_page,
            });
        } catch (error) {
            next(error);
        }

    }


}

module.exports = new homeC;