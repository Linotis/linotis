const express = require('express');
const router = express.Router();
const controller = require('../controllers/statistics-controller');

router.get('/overview', controller.overview);

module.exports = router;