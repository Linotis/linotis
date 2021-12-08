const express = require('express');
const router = express.Router();
const passport = require('passport');
const collectionController = require('../controllers/collection-controller');
const scribbleController = require('../controllers/scribble-controller');

router.get('/', collectionController.getAllCollections);
router.get('/:id', collectionController.getCollectionById);
router.post('/', collectionController.createCollection);
router.delete('/:id', collectionController.deleteCollectionById);
router.patch('/:id', collectionController.updateCollectionById);

router.post('/scribble/create', scribbleController.createScribble);
router.get('/scribble/:id', scribbleController.getScribbleById);
router.delete('/scribble/:id', scribbleController.deleteScribbleById);
module.exports = router;