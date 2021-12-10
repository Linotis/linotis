const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../middleware/upload');
const collectionController = require('../controllers/collection-controller');
const scribbleController = require('../controllers/scribble-controller');

router.get('/', collectionController.getAllCollections);
router.get('/:id', collectionController.getCollectionById);
router.post('/', collectionController.createCollection);
router.patch('/:id', collectionController.updateCollectionById);
router.delete('/:id', collectionController.deleteCollectionById);

router.post('/scribble/create', upload.single('image'), scribbleController.createScribble);
router.get('/scribble/:id', scribbleController.getScribbleById);
router.patch('/scribble/:id', scribbleController.updateScribbleById);
router.delete('/scribble/:id', scribbleController.deleteScribbleById);

module.exports = router;