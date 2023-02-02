//const user = require('./userR');
const login = require('./login');
const signup = require('./signup');
const home = require('./home');
const movie = require('./pagemovie');
const cast = require('./cast');
const search = require('./search');
const favorite = require('./favorite');

function router(app) {

    app.use('/login', login);
    app.use('/signup', signup);
    app.use('/home', home);
    app.use('/movie', movie);
    app.use('/cast', cast);
    app.use('/search', search);
    app.use('/favorite', favorite);
    // app.use('/', login);

}

module.exports = router;