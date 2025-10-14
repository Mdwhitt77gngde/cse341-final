// serverAppForTests.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./auth/passport-setup'); // safe to require

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/', require('./routes')); // mounts /authors, /books, /users, /projects, /auth

module.exports = app;
