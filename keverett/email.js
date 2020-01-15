var nodemailer = require('nodemailer');

var mailit = function (){
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matchaemail1234@gmail.com',
    pass: 'WTC12345!'
  }
});

var mailOptions = {
  from: 'everett.kyle.john@gmail.com',
  to: 'kyle@mailinator.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
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