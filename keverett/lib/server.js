var Router = require("../routing_paths/Router.js")
var express = require('express');
var session = require('express-session')
var vCardsJS = require('vcards-js');

class MatchaApp
{

    constructor()
    {
        // Express initialisation
        this.express = express;
        this.app = express();
        this.router = new Router(this.app);
    };


    start()
{
    var vCard = vCardsJS();
    vCard.
    this.app.use(session({
        'secret': '343ji43j4n3jn4jk3n',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: true }
    }))
    this.app.set('view engine', 'ejs');
    this.app.use('/assets', this.express.static('assets'));
    this.router.setRoutes(this.app, this.mongo);
    this.app.listen(3000);
}
}

module.exports = MatchaApp;
