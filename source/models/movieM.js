const db = require('../configs/db/connectDB');

module.exports = {

    isemptydbMovies: async() => {
        const rs = await db.any('SELECT * FROM public."Movies"');
        if (rs.length == 0) {
            return true;
        } else return false;
    },

    isemptydbCasts: async() => {
        const rs = await db.any('SELECT * FROM public."Casts"');
        if (rs.length == 0) {
            return true;
        } else return false;
    },

    isemptydbReviews: async() => {
        const rs = await db.any('SELECT * FROM public."Reviews"');
        if (rs.length == 0) {
            return true;
        } else return false;
    },

    isemptydbSynopses: async() => {
        const rs = await db.any('SELECT * FROM public."Synopses"');
        if (rs.length == 0) {
            return true;
        } else return false;
    },

    isemptydbCastsMovie: async() => {
        const rs = await db.any('SELECT * FROM public."CastsMovie"');
        if (rs.length == 0) {
            return true;
        } else return false;
    },



    insertMovies: async obj => {
        const rs = await db.one('INSERT INTO public."Movies"("id","img","title", "year", "topRank", "rating", "ratingCount", "genres") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [obj.id, obj.img, obj.title, obj.year, obj.topRank, obj.rating, obj.ratingCount, obj.genres]);
        return rs;
    },

    insertReviews: async obj => {
        const rs = await db.one('INSERT INTO public."Reviews"("id_movie","author","authorRating", "helpfulnessScore", "languageCode", "reviewText", "reviewTitle", "submissionDate") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [obj.id_movie, obj.author, obj.authorRating, obj.helpfulnessScore, obj.languageCode, obj.reviewText, obj.reviewTitle, obj.submissionDate]);
        return rs;
    },

    insertSynopses: async obj => {
        const rs = await db.one('INSERT INTO public."Synopses"("id_movie","hasProfanity","language", "text") VALUES ($1,$2,$3,$4) RETURNING *', [obj.id_movie, obj.hasProfanity, obj.language, obj.text]);
        return rs;
    },

    insertCasts: async obj => {
        const rs = await db.one('INSERT INTO public."Casts"("id","image","legacyNameText", "name", "birthDate", "birthPlace", "gender", "heightCentimeters", "nicknames", "realName") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *', [obj.id, obj.image, obj.legacyNameText, obj.name, obj.birthDate, obj.birthPlace, obj.gender, obj.heightCentimeters, obj.nicknames, obj.realName]);
        return rs;
    },

    insertCastsMovie: async obj => {
        const rs = await db.one('INSERT INTO public."CastsMovie"("id_movie","id_casts","characters", "name") VALUES ($1,$2,$3,$4) RETURNING *', [obj.id_movie, obj.id_casts, obj.characters, obj.name]);
        return rs;
    },

    fetchMovies: async() => {
        const res = require('../db/movies.json');
        return res;
    },

    fetchCasts: async() => {
        const res = require('../db/casts.json');
        return res;
    },

    selectAllMovies: async() => {
        const rs = await db.any('SELECT * FROM public."Movies"');
        return rs;
    },

    selectMoviesRating: async() => {
        const rs = await db.any('SELECT * FROM public."Movies" WHERE "Movies"."rating" > 0 ORDER BY "Movies"."rating" DESC');
        return rs;
    },

    selectOneMovie: async id => {
        const rs = await db.any('SELECT * FROM public."Movies" WHERE "Movies"."id" = $1', [id]);
        return rs;
    },

    selectReviews: async id => {
        const rs = await db.any('SELECT * FROM public."Reviews" WHERE "Reviews"."id_movie" = $1', [id]);
        return rs;
    },

    selectCastsMovie: async id => {
        const rs = await db.any('SELECT * FROM public."CastsMovie" WHERE "CastsMovie"."id_movie" = $1', [id]);
        return rs;
    },

    selectSynopses: async id => {
        const rs = await db.any('SELECT * FROM public."Synopses" WHERE "Synopses"."id_movie" = $1', [id]);
        return rs;
    },

    selectOneCast: async id => {
        const rs = await db.any('SELECT * FROM public."Casts" WHERE "Casts"."id" = $1', [id]);
        return rs;
    },

    selectMovieCast: async id => {
        const rs = await db.any('SELECT * FROM public."Casts" JOIN public."CastsMovie" ON "Casts"."id" = "CastsMovie"."id_casts" JOIN public."Movies" ON "Movies"."id" = "CastsMovie"."id_movie"  WHERE "Casts"."id" = $1', [id]);
        return rs;
    },

    selectMoviebyName: async name => {
        const temp = '%' + name + '%'
        const rs = await db.any('SELECT * FROM public."Movies" WHERE "Movies"."title" LIKE $1', [temp]);
        return rs;
    },

    selectCastbyName: async name => {
        const temp = '%' + name + '%'
        const rs = await db.any('SELECT * FROM public."Casts" WHERE "Casts"."name" LIKE $1', [temp]);
        return rs;
    },


    insertFavoriteMovie: async id => {
        const rs = await db.one('INSERT INTO public."Favorites"("id_movie") VALUES ($1) RETURNING *', [id]);
        return rs;
    },

    isExistFavoriteMovie: async id => {
        const rs = await db.any('SELECT * FROM public."Favorites" WHERE "Favorites"."id_movie" = $1', [id]);
        if (rs.length == 0) {
            return false;
        } else {
            return true;
        }
    },

    selectFavoriteMovie: async() => {
        const rs = await db.any('SELECT * FROM public."Favorites" JOIN public."Movies" ON "Favorites"."id_movie" = "Movies"."id"');
        return rs;
    },

    deleteFavoriteMovie: async id => {
        const rs = await db.any('DELETE FROM public."Favorites" WHERE "Favorites"."id_movie" = $1', [id]);
        return rs;
    },

}