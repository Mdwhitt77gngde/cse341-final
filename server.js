const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config(); // ensure env is present
require('./auth/passport-setup'); // register GitHub strategy only if env present

const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

// parse JSON bodies
app.use(bodyParser.json());

// initialize passport for OAuth endpoints
app.use(passport.initialize());

// CORS & common headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Mount auth routes
app.use('/auth', require('./routes/auth'));

// Mount main application routes (also serves /api-docs via routes/swagger)
app.use('/', require('./routes'));

// Initialize DB and start the server
mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
});
