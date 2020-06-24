
// Package setup for express and EJS
SESSION_ID = "2i8smrXY";

// var session = require('express-session')
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');
// var bcrypt = require('bcryptjs');
// var mongo = require('./mongo.js');
// var nodemailer = require('nodemailer');
// var urlEncodedParser = bodyParser.urlencoded({ extended: false });

const appServer = require("./lib/server.js");
var express = require('express');
var app = express();

// var exists = []
let server = new appServer(app)
server.start();
