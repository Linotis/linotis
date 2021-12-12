require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const collectionsRoutes = require('./routes/collections');
const statisticsRoutes = require('./routes/statistics');

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Mongo connected'))
  .catch(error => console.log(error));

const app = express();

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('morgan')('dev'));
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/collection', collectionsRoutes);
app.use('/api/statistics', statisticsRoutes);

module.exports = app;