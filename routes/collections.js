const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/collection-controller');

router.get('/', controller.getAllCollections);
router.get('/:id', controller.getCollectionById);
router.post('/', controller.createCollection);

module.exports = router;