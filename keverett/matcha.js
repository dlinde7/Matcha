
// Package setup for express and EJS
var bcrypt = require('bcrypt');
var mongo = require('./mongo.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var nodemailer = require('nodemailer');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
var exists = []

// Registration form authetication
app.post('/register/register', urlEncodedParser, (req, res) => {
	var user = req.body.username;
	var pwd = req.body.password;
	var user_email = req.body.email;
	console.log("got here");
	//Regex pattern for email validation
	let pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

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
			mongo.regUser(user, user_email, password_hash, verification_hash);
			email.mailit(req.body.email, req.body.username, verification_hash);
			res.render("signUp", { errors: ["Your account has been registered! Please check your email to verify your account"] });
		}
	};
	authenticate();
});

// General routing for user navigation
app.get('/', (req, res) => {
	res.render('index');
});

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
		console.log("password hash is : " + password_hash)
		bcrypt.compare(req.body.password, password_hash, function (err, res) {
			if (res)
			{
			console.log('success!')
			}
			else
			{
				console.log('failure');
			}
		});
	}
	else
	{
		console.log('nothing');
	}
});
});

app.get('/register/login', (req, res) => {
	res.render('login');
});
app.get('/register/signUp', (req, res) => {
	res.render('signUp')
});
app.get('/profile/:id', (req, res) => {
	var data = { age: 29, job: 'ninja', hobbies: ['eating', 'gaming', 'shading'] };
	res.render('profile', { person: req.params.id, data: data });
});
app.listen(3000);
