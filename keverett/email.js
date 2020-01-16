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
  from: user,
  to: email_address,
  subject: 'Matcha account verification',
  text: 'Hello, ' + username + '! Thank you for registering an account on Matcha. To complete your account registration, please click the following link: http://localhost:3000/register/verify/' + username + '/' + Hash
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
};



module.exports.mailit = mailit;