var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/matcha";

var dbConn = function () {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		console.log("Database created!");
		db.close();
	});
};


var createColl = function () {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("matcha");
		dbo.createCollection("users", function (err, res) {
			if (err) throw err;
			console.log("Collection created!");
			db.close();
		});
	});
};

var regUser = function () {
	MongoClient.connect(url, function (err, db){
		if (err) throw err;
		var dbo = db.db("matcha");
		var userInfo = { name: name, lastname: lname, gender: gen, hair: hair, sexualorientation: sor,
			personality: { 1: , 2: , 3: }, eyecolour: eye, height: len, age: age, race: rc, 
			features: { 1: , 2: , 3: }, personalitypref: { 1: , 2: , 3: }, profilepic: pric, verified: 0 };
		dbo.collection("users").insertOne(userInfo, function(err, res) {
			if (err) throw err;
			console.log("1 document inserted");
			db.close();
		});
	});
};

module.exports = dbConn
module.exports = createColl
module.exports = regUser
