
// Package setup for express and EJS
var bcrypt = require('bcrypt');
var mongo = require('./mongo.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var nodemailer = require('nodemailer');
var urlEncodedParser = bodyParser.urlencoded({ extended: false});
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
var exists = []

// Registration form authetication
app.post('/register/register', urlEncodedParser, (req, res) => {
	var user = req.body.username;
	var pwd = req.body.password;
	var email = req.body.email;
	
	//Regex pattern for email validation
	let pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	
	mongo.exists(user).then(result => {
	if (result === true)
	{
		console.log("A user exists");
		exists.push("Username already exists");
	}

	if (!req.body.email.match(pattern))
	{
		exists.push("Not a valid email address");
	}
	if (req.body.password !== req.body.re_password)
	{
		exists.push("Passwords do not match")
	}
	if (exists.length > 0)
	{
		console.log("Error rendering " + exists);
		res.render('signUp', {errors: exists});
		exists = [];
	}
	else
	{
		bcrypt.hash(req.body.password, 10, (password_hash, err) =>
		{
			var email = require('./email.js');
			verification_hash = bcrypt.hash("origami", 10, (v_hash) => {return v_hash});
			mongo.dbConn();
			mongo.createColl();
			console.log(password_hash);
			console.log(verification_hash);
			mongo.regUser(user, email, pwd, password_hash, verification_hash);
			email.mailit(req.body.email, req.body.username, verification_hash);
			res.render("signUp", {errors: ["Your account has been registered! Please check your email to verify your account"]});
		});
	}
	});

})

// General routing for user navigation
app.get('/', (req, res) => {
	res.render('index');
});
app.get('/register/login', (req, res) => {
    res.render('login');
});
app.get('/register/signUp', (req, res) => 
{
	res.render('signUp')
});
app.get('/profile/:id', (req, res) => {
    var data = {age: 29, job: 'ninja', hobbies: ['eating', 'gaming', 'shading']};
    res.render('profile', {person: req.params.id, data: data});
});


app.listen(3000);