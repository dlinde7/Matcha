
class routeUsers {
    constructor(app){
        this.app = app;
        this.bodyParser = require('body-parser');
        this.urlEncodedParser = this.bodyParser.urlencoded({ extended: false });
    }

    setRoutes()
    {

    this.app.get('/users/change_password', (req, res) => {
    res.render('cp_test.ejs');
});


this.app.get('/users/gallery', (req, res) =>
{

    if (req.session.status && req.session.status.logged_in)
    {
        res.send("Yay!");
    }
    else
    {
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: </p>')
        res.write('<p>expires in: </p>')
        res.end()
    }
});
        this.app.post('/user/change_info', this.urlEncodedParser, async function (req, res) {

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

        this.app.post('/user/change_password', this.urlEncodedParser, function (req, res) {

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
    }
}

module.exports = routeUsers;
