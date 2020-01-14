
// Package setup for express and EJS

var mongo = require('./mongo.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false});
console.log("hello");

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.post('/register/register', urlEncodedParser, (req, res) => {
	console.log (req.body);
	res.redirect('/');
})
app.get('/', (req, res) => {

	res.render('index');
	var user = "charlie";
	var password = "Pips";
	var email = "pippy@pipster.com";
	mongo.dbConn();
	console.log(mongo.msg);
	// mongo.createColl;
	// mongo.regUser;
});
app.get('/register/login', (req, res) => {
    res.render('login');
	// res.send("Hello");
});
app.get('/register/signUp', (req, res) => 
{
	res.render('signUp')
});
app.get('/profile/:id', (req, res) => {
    var data = {age: 29, job: 'ninja', hobbies: ['eating', 'gaming', 'shading']};
    res.render('profile', {person: req.params.id, data: data});
    // res.send('You requested to see a profile with the id of ' + req.params.id);
});
app.listen(3000);