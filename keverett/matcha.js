
// Package setup for express and EJS

var mongo = require('./mongo.js');
var trans = require('./email.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var urlEncodedParser = bodyParser.urlencoded({ extended: false});
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

// Post routing for form data being sent
app.post('/register/register', urlEncodedParser, (req, res) => {
	var user = req.body.username;
	var pwd = req.body.password;
	var email = req.body.email;
	mongo.exists(user).then(result => {
	console.log(result);
	
	var exists = []
	if (result === true)
	{
		exists.push("Username already exists", "Email already in use");
		res.render('signUp', {errors: exists});
		console.log(exists);
	}
	else if (result === false)
	{
		mongo.dbConn();
		mongo.createColl();
		mongo.regUser(user, email, pwd);
		res.redirect('/');
	}
	});



	// mongo.dbConn();
	// mongo.createColl();
	// mongo.regUser(user, email, pwd);
	// res.redirect('/');
})

// General routing for user navigation
app.get('/', (req, res) => {
	trans.mailit();
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