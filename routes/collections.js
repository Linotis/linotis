const express = require('express');
const router = express.Router();
const controller = require('../controllers/collection-controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/:id', controller.create);
router.delete('/:id', controller.remove);
router.patch('/:id', controller.update);

module.exports = router;