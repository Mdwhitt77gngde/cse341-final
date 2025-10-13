// serverAppForTests.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./auth/passport-setup');

const mongodb = require('./data/database');

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/', require('./routes')); // mounts /authors, /books, /users, /projects
// do NOT init db here — tests will call initDb manually in a beforeAll

module.exports = app;
