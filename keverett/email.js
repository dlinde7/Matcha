var nodemailer = require('nodemailer');

var mailit = function (email_address, username, hash){
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matchaemail1234@gmail.com',
    pass: 'WTC12345!'
  }
});

var mailOptions = {
  from: 'matchaemail1234@gmail.com',
  to: email_address,
  subject: 'Matcha account verification',
  text: 'Hello, ' + username + '! Thank you for registering an account on Matcha. To complete your account registration, please click the following link: http://localhost:3000/register/verify/' + username + '/' + encodeURIComponent(hash)
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
};

// var verify_email(user, hash)
// {
//   // Bring up user's hash from DB. If null, error.

//   // If they match, update verified status to active
// }



module.exports.mailit = mailit;