var mailer = require('../email.js');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var mongo = require('../mongo.js');
var bcrypt = require('bcryptjs');
var routeUsers = require("./users");
var routeRegistration = require('./registration');
var routeProfile = require('./profile');
var routeChat = require('./chat');

class Router {

    constructor(app)
     {
         this.app = app;
         this.userRoutes = new routeUsers(app);
         this.registrationRoutes = new routeRegistration(app);
         this.profileRoutes = new routeProfile(app)
         this.chatRoutes = new routeChat(app);
     }

    setRoutes(app) {

        //Page routing based on type of pages. See each class for routing specifics.
        this.userRoutes.setRoutes();
        this.registrationRoutes.setRoutes();
        this.profileRoutes.setRoutes();
        this.chatRoutes.setRoutes();

        app.get('/', (req, res) => {
            res.render('index');
        });
    }
}

module.exports = Router;
