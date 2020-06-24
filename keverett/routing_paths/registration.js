class routeRegistration
{
    constructor(app)
    {
        this.app = app;
        this.bodyParser = require('body-parser');
        this.urlEncodedParser = this.bodyParser.urlencoded({ extended: false });
    }

    setRoutes()
    {
        this.app.get('/register/signUp', (req, res) => {
            res.render('signUp');
        });

        this.app.get('/register/login', (req, res) => {
            res.render('login');
        });

        this.app.post('/register/register', this.urlEncodedParser, (req, res) => {
            var exists = []
            var user = req.body.username;
            var pwd = req.body.password;
            var user_email = req.body.email;
            //Regex pattern for email validation
            const pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

            async function authenticate() {
                var user_exists = await mongo.exists(user)
                console.log('got here');
                var email_exists = await mongo.email_exists(user_email)

                if (user_exists === true) {
                    exists.push("Username already exists");
                }
                else if (email_exists === true) {
                    exists.push("The email address provided is already in use");
                }
                else {
                    if(user.length < 5)
                    {
                        exists.push("Usernames must be at least 5 characters long");
                    }
                    if (pwd.length < 8)
                    {
                        exists.push("Passwords must be at least 8 characters long");
                    }
                    if (!req.body.email.match(pattern)) {
                        exists.push("Not a valid email address");
                    }
                    if (req.body.password !== req.body.re_password) {
                        exists.push("Passwords do not match")
                    }
                    if (!req.body.password.match(/[a-zA-Z]/) || !req.body.password.match(/[\d]/) || !req.body.password.match(/[^a-zA-Z\d]/)) {
                        exists.push("Passwords must contain at least of each category: lowercase characters, uppercase characters, number and special characters(!, *, # etc)")
                    }
                }
                if (exists.length > 0) {
                    res.render('signUp', { errors: exists });
                    exists = [];
                }
                else {
                    mailer = new Mailer();
                    var password_hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                    var verification_hash = bcrypt.hashSync("origami", bcrypt.genSaltSync(10));
                    mongo.dbConn();
                    mongo.createColl();
                    mongo.regUser(user, user_email, password_hash, verification_hash, req.body.fname, req.body.lname);
                    mailer.verification_email(req.body.email, req.body.username, verification_hash);
                    res.render("signUp", { errors: ["Your account has been registered! Please check your email to verify your account"] });
                }
            };
            authenticate();
        });

        this.app.get('/register/verify/:username/:hash', function (req, result) {
            if (req.params.username && req.params.hash) {
                mongo.get_vhash(req.params.username).then(res => {
                    if (res == req.params.hash) {
                        mongo.verify(req.params.username);
                        result.redirect('/register/login');
                    }
                }).catch(error => { console.log(error) });
            };
        });


        this.app.post('/register/login_request', this.urlEncodedParser, function (req, res) {
            mongo.find('username', req.body.username, 'password').then((password_hash) =>
            {
                if (password_hash) {
                    bcrypt.compare(req.body.password, password_hash, function (err, result) {
                        if (result)
                        {
                            req.session.status = { logged_in: true, username: req.body.username };
                            res.send("success");
                        }
                        else
                        {
                            res.send('failure to log in')
                        }
                    });
                }
                else
                {
                    console.log('nothing');
                }
            });
        });

        this.app.post('/register/forgot_password', this.urlEncodedParser, async function (req, res) {

            if (await mongo.exists(req.body.username) === true)
            {
                var user_info = await mongo.findAll(req);

                var email = require('../email.js');
                email.mail_password_reset(user_info.email, req.body.username, user_info.verification_hash)
                res.render("/register/forgot_password", { Info: "An email requesting a password reset has been sent to the email address associated with this account."})
            }
        })

        this.app.get('/register/forgot_password_login/:username/:hash', async function (req, res) {
            if (req.params.username && req.params.hash) {

                var user_info = await mongo.findAll(req);

                if (user_info.verification_hash === req.params.hash)
                {
                    if (user_info.verified === 1)
                    {
                        res.render("/user/profile/change_password");
                    }
                    else
                    {
                        var email = require('../email.js');
                        console.log("User is not verified. Redirecting...")
                        email.mailit(user_info.email, user_info.username, user_info.verification_hash);
                        res.render("/register/forgot_password", { Info: "You need to first verify your account before you password can be reset. Please check your email inbox"})
                    }
                }
                mongo.get_vhash(req.params.username).then(res => {
                    if (res == req.params.hash) {
                        mongo.verify(req.params.username);
                        result.redirect('/register/login');
                    }
                }).catch(error => { console.log(error) });
            };
        });

    }
}

module.exports = routeRegistration;
