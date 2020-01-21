var mongoClient = require('mongodb').mongoClient;
var url = "mongodb://localhost:27017/matcha";

var dbConn = function () {
	mongoClient.connect(url, function (err, db) {
		if (err) throw err;
		console.log("Database connected!");
		db.close();
	});
};


var createColl = function () {
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

var regUser = function (user, email, pwd, vhash) {
	mongoClient.connect(url, function (err, db){
		if (err) throw err;
		var dbo = db.db("matcha");
		var userInfo = { username: user, email: email, password: pwd, verified: 0, verification_hash: vhash };
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

/*var accSetUp = function () {
	mongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("matcha");
		var myQuery = { username: user, verified: 1};
		var newValues = { $set: { name: name, lastname: lname, gender: gen, hair: hair, sexualorientation: sor,
			personality: { 1: , 2: , 3: }, eyecolour: eye, height: len, age: age, race: rc, features: { 1: , 2: , 3: },
			personalitypref: { 1: , 2: , 3: , 4: , 5: , 6: , 7: , 8: , 9: , 10: }, profilepic: pric } };
		dbo.collection("users").updateOne(myQuery, newValues, function(err, res) {
			if (err) throw err;
			console.log("profile updated");
			db.close();
		});
	});
}*/

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

var exists = function (user) {
	return new Promise(resolve => {
		mongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db("matcha");
			dbo.collection("users").count({ username: user }, function (error, count) {
				if (count > 0) {
					db.close();
					resolve(true)
				}
				else {
					db.close();
					resolve(false);
				}
			});
		});

	});
}

var isVerified = function (user) {
	return new Promise(resolve => {
		mongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db("matcha");
			dbo.collection("users").count({ username: user, verified: 1 }, function (error, count) {
				if (count = 1) {
					db.close();
					resolve(true)
				}
				else {
					db.close();
					resolve(false);
				}
			});
		});

	});
}

var get_vhash = function (user) {
	mongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("matcha");
		var query = { username: user};
		dbo.collection("users").find(query, {vhash: 1, _id: 0}).toArray(function (err, result) {
			if (err) throw err;
			else
			{
				db.close();
				return(result[0])
			}
		})
	})
}

module.exports = dbConn
module.exports = createColl
module.exports = regUser
module.exports = accSetUp
module.exports = verify
module.exports = newPassword
module.exports = newEmail
module.exports = deleteUser
module.exports = exists
