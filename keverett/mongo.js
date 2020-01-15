
var mongoClient = require('mongodb');
var url = "mongodb://localhost:27017/matcha";
var tonic = 'water';
var dbConn = function () {
	console.log("here too");
	mongoClient.connect(url, function (err, db) {
		if (err) throw err;
		console.log("Database connected!");
		db.close();
	});
};


var createColl = function () {
	console.log("colling");
	mongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("matcha");
		dbo.createCollection("users", function (err, res) {
			if (err) throw err;
			console.log("Collection created!");
			db.close();
		});
	});
};

var regUser = function (user, email, pwd) {
	mongoClient.connect(url, function (err, db){
		if (err) throw err;
		var dbo = db.db("matcha");
		var userInfo = { username: user, email: email, password: pwd, verified: 0 };
		dbo.collection("users").insertOne(userInfo, function(err, res) {
			if (err) throw err;
			console.log("New user added");
			db.close();
		});
	});
};

var verify = function () {
	mongoClient.connect(url, function (err, db){
		if (err) throw err;
		var dbo = db.db("matcha");
		var myQuery = { username: user};
		var newValues = {verified: 1};
		dbo.collection("users").updateOne(myQuery, newValues, function(err, res) {
			if (err) throw err;
			console.log("User has been verified");
			db.close;
		});
	});
}

// var accSetUp = function () {
// 	mongoClient.connect(url, function(err, db) {
// 		if (err) throw err;
// 		var dbo = db.db("matcha");
// 		var myQuery = { username: user, verified: 1};
// 		var newValues = { $set: { name: name, lastname: lname, gender: gen, hair: hair, sexualorientation: sor,
// 			personality: { 1: , 2: , 3: }, eyecolour: eye, height: len, age: age, race: rc, features: { 1: , 2: , 3: },
// 			personalitypref: { 1: , 2: , 3: , 4: , 5: , 6: , 7: , 8: , 9: , 10: }, profilepic: pric } };
// 		dbo.collection("users").updateOne(myQuery, newValues, function(err, res) {
// 			if (err) throw err;
// 			console.log("profile updated");
// 			db.close();
// 		});
// 	});
// }

var newPassword = function () {
	mongoClient.connect(url, function (err, db){
		if (err) throw err;
		var dbo = db.db("matcha");
		var myQuery = { username: user};
		var newValues = { password: pwd};
		dbo.collection("users").updateOne(myQuery, newValues, function(err, res) {
			if (err) throw err;
			console.log("Password updated");
			db.close;
		});
	});
}

var newEmail = function () {
	mongoClient.connect(url, function (err, db){
		if (err) throw err;
		var dbo = db.db("matcha");
		var myQuery = { username: user};
		var newValues = { email: email};
		dbo.collection("users").updateOne(myQuery, newValues, function(err, res) {
			if (err) throw err;
			console.log("Email updated");
			db.close;
		});
	});
}

var deleteUser = function () {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("matcha");
		var myquery = { username: user };
		dbo.collection("users").deleteOne(myquery, function(err, obj) {
			if (err) throw err;
			console.log("User account deleted!");
			db.close();
		});
	});
}

module.exports.dbConn = dbConn
module.exports.createColl = createColl
module.exports.regUser = regUser
// module.exports = accSetUp
// module.exports = verify
// module.exports = newPassword
// module.exports = newEmail
// module.exports = deleteUser