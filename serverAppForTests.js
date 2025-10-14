require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
// Safe to require passport setup even if OAuth env vars are missing
require('./auth/passport-setup');

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

// Mount routes (these files expect a database to be initialized separately by tests)
app.use('/', require('./routes'));

module.exports = app;
