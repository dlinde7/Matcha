
// Package setup for express and EJS
var mongoClient = require('mongodb');
var url = "mongodb://localhost:27017/matcha";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false});
// console.log(mongoClient);

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.post('/register/register', urlEncodedParser, (req, res) => {
	console.log (req.body);
	res.redirect('/');
})
app.get('/', (req, res) => {

	mongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("matcha");
		dbo.createCollection("users", function (err, res) {
			if (err) throw err;
			console.log("Collection created!");
			db.close();
		});
	});

	res.render('index');
	// console.log('done!');
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