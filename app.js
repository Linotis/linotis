const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const collectionsRoutes = require('./routes/collections');
const statisticsRoutes = require('./routes/statistics');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('morgan')('dev'));
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/collection', collectionsRoutes);
app.use('/api/statistics', statisticsRoutes);

module.exports = app;