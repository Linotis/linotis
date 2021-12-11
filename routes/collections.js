const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../middleware/upload');
const collectionController = require('../controllers/collection-controller');
const scribbleController = require('../controllers/scribble-controller');

router.get('/', passport.authenticate('jwt', {session: false}), collectionController.getAllCollections);
router.get('/:id', passport.authenticate('jwt', {session: false}), collectionController.getCollectionById);
router.post('/', passport.authenticate('jwt', {session: false}), collectionController.createCollection);
router.patch('/:id', passport.authenticate('jwt', {session: false}), collectionController.updateCollectionById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), collectionController.deleteCollectionById);

router.post('/scribble/create', upload.single('image'), passport.authenticate('jwt', {session: false}), scribbleController.createScribble);
router.get('/scribble/:id', passport.authenticate('jwt', {session: false}), scribbleController.getScribbleById);
router.patch('/scribble/:id', passport.authenticate('jwt', {session: false}), scribbleController.updateScribbleById);
router.delete('/scribble/:id', passport.authenticate('jwt', {session: false}), scribbleController.deleteScribbleById);

module.exports = router;