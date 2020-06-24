var express = require('express');
var routes = express.Router();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var session = require('express-session')
var cookieParser = require('cookie-parser');


class Routes {
    constructor()

}

route.post('/register/register', urlEncodedParser, (req, res) => {
    var user = req.body.username;
    var pwd = req.body.password;
    var user_email = req.body.email;
    console.log("got here");
    //Regex pattern for email validation
    const pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    async function authenticate() {

        var user_exists = await mongo.exists(user)
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
            console.log("Error rendering " + exists);
            res.render('signUp', { errors: exists });
            exists = [];
        }
        else {
            var email = require('./email.js');

            password_hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            verification_hash = bcrypt.hashSync("origami", bcrypt.genSaltSync(10));
            mongo.dbConn();
            mongo.createColl();
            console.log(verification_hash);
            mongo.regUser(user, user_email, password_hash, verification_hash, req.body.fname, req.body.lname);
            email.mailit(req.body.email, req.body.username, verification_hash);
            res.render("signUp", { errors: ["Your account has been registered! Please check your email to verify your account"] });
        }
    };
    authenticate();
});

// General routing_paths for user navigation
route.get('/', (req, res) => {
    res.render('index');
});
//
app.get('/register/verify/:username/:hash', function (req, result) {
    if (req.params.username && req.params.hash) {
        mongo.get_vhash(req.params.username).then(res => {
            if (res == req.params.hash) {
                mongo.verify(req.params.username);
                result.redirect('/register/login');
            }
        }).catch(error => { console.log(error) });
    };
});


app.post('/register/login_request', urlEncodedParser, function (req, res) {
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
//
app.get('/users/change_password', (req, res) => {
    res.render('cp_test.ejs');
});
app.get('/register/login', (req, res) => {
    res.render('login');
});
route.get('/register/signUp', (req, res) => {
    res.render('signUp')
});
app.get('/profile/:id', (req, res) => {
    var data = { age: 29, job: 'ninja', hobbies: ['eating', 'gaming', 'shading'] };
    res.render('profile', { person: req.params.id, data: data });


});
app.get('/users/gallery', (req, res) =>
{

    if (req.session.status && req.session.status.logged_in)
    {
        res.send("Yay!");
    }
    else
    {
        res.send("Neigh!");
    }
});

app.get('/chat', (req, res) =>
{
    res.render("chat");
});

app.post('/register/forgot_password', urlEncodedParser, async function (req, res) {

    if (await mongo.exists(req.body.username) === true)
    {
        var user_info = await mongo.findAll(req);

        var email = require('./email.js');
        email.mail_password_reset(user_info.email, req.body.username, user_info.verification_hash)
        res.render("/register/forgot_password", { Info: "An email requesting a password reset has been sent to the email address associated with this account."})
    }
})

app.get('/register/forgot_password_login/:username/:hash', async function (req, res) {
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
                var email = require('./email.js');
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

// app.post('/user/change_password', urlEncodedParser, async function (req, res) {

// 	if (req.session.status && req.session.status.logged_in)
// 	{
// 		res.send("Yay!");
// 		var exists = [];
// 		console.log(req.body);
// 			if (req.body.new_pwd.length < 8)
// 			{
// 				exists.push("Passwords must be at least 8 characters long");
// 			}
// 			if (req.body.new_pwd !== req.body.confirm_pwd) {
// 				exists.push("Passwords do not match")
// 			}
// 			if (!req.body.new_pwd.match(/[a-zA-Z]/) || !req.body.new_pwd.match(/[\d]/) || !req.body.new_pwd.match(/[^a-zA-Z\d]/)) {
// 				exists.push("Passwords must contain at least of each category: lowercase characters, uppercase characters, number and special characters(!, *, # etc)")
// 			}
// 		if (exists.length > 0) {
// 			console.log("Error rendering " + exists);
// 			res.render('/user/change_password', { errors: exists });
// 			exists = [];
// 		}
// 		else
// 		{
// 			mongo.newPassword(req.session.status.username, req.body.new_pwd);
// 			// res.render('/user/change_password', { exists: "Your password has been updated. Enjoy!"})
// 			console.log("Password changed");
// 		}
// 	}
// 	else
// 	{
// 		// res.render("Error. Not logged in")
// 	}
// })

app.post('/user/change_password', urlEncodedParser, function (req, res) {

    mongo.userUpdate(req.body);

    // if (req.session.status && req.session.status.logged_in)
    // {
    // 	res.send("Yay!");
    // 	var exists = [];
    // 	console.log(req.body);
    // 		if (req.body.new_pwd.length < 8)
    // 		{
    // 			exists.push("Passwords must be at least 8 characters long");
    // 		}
    // 		if (req.body.new_pwd !== req.body.confirm_pwd) {
    // 			exists.push("Passwords do not match")
    // 		}
    // 		if (!req.body.new_pwd.match(/[a-zA-Z]/) || !req.body.new_pwd.match(/[\d]/) || !req.body.new_pwd.match(/[^a-zA-Z\d]/)) {
    // 			exists.push("Passwords must contain at least of each category: lowercase characters, uppercase characters, number and special characters(!, *, # etc)")
    // 		}
    // 	if (exists.length > 0) {
    // 		console.log("Error rendering " + exists);
    // 		res.render('/user/change_password', { errors: exists });
    // 		exists = [];
    // 	}
    // 	else
    // 	{
    // 		mongo.newPassword(req.session.status.username, req.body.new_pwd);
    // 		// res.render('/user/change_password', { exists: "Your password has been updated. Enjoy!"})
    // 		console.log("Password changed");
    // 	}
    // }
    // else
    // {
    // 	// res.render("Error. Not logged in")
    // }
})


app.post('/user/change_info', urlEncodedParser, async function (req, res) {

    if (req.session.status && req.session.status.logged_in)
    {
        var exists = [];
        console.log(req.body);

        //Check field validity
        if (req.body.username.length < 4)
        {
            exists.push("Usernames should be at least 4 characters long");
        }
        if(req.body.features.length < 2)
        {
            exists.push("You need to assign yourself at least 2 general features. #don'tbeshy")
        }
        if(req.body.features.length > 10)
        {
            exists.push("You can only list up to 10 features. Choose wisely!")
        }
        if(req.body.personality.length < 2)
        {
            exists.push("You need to assign yourself at least 2 personality features. #don'tbeshy")
        }
        if(req.body.personality.length > 10)
        {
            exists.push("You can only list up to 10 personality features. Choose wisely!")
        }
        if(req.body.other.length < 2)
        {
            exists.push("You need to assign yourself at least 2 other features. #don'tbeshy")
        }
        if(req.body.personality.length > 10)
        {
            exists.push("You can only list up to 10 other features. Choose wisely!")
        }
        if(req.body.looking_for.length < 2)
        {
            exists.push("You need to give us at least 2 features you are looking for in a person.")
        }
        if(req.body.looking_for.length > 25)
        {
            exists.push("Don't be greedy! Keep your list of wanted features to 25 or less.")
        }
        if (req.body.bio.length > 200)
        {
            exists.push("Please shorten your bio. #TMI")
        }



        if (exists.length > 0) {
            console.log("Error rendering " + exists);
            res.render('/user/change_password', { errors: exists });
            exists = [];
        }
        else
        {
            if (!req.body.location)
            {
                //Code for gps location info
            }
            mongo.userUpdate(req.body);
            // res.render('/user/change_password', { exists: "Your password has been updated. Enjoy!"})
            console.log("Password changed");
        }
    }
    else
    {
        // res.render("Error. Not logged in")
    }
})

module.exports = route;
