const Collection = require('../models/Collection');
const Scribble = require('../models/Scribble');
const errorHandler = require('../utils/errorHandler');

module.exports.getScribbleById = async function(req, res) {
  try {
    const scribble = await Scribble.findById(req.params.id);
    res.status(200).json(scribble);
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.createScribble = async function(req, res) {
  const scribble = new Scribble({
    title: req.body.title,
    imgSrc: req.file ? req.file.path : '',
    collectionId: req.body.collectionId
  });

  try {
    await scribble.save();
    const collectionById = await Collection.findById(req.body.collectionId);
    collectionById.scribbles.push(scribble);
    await collectionById.save();

    res.status(201).json(collectionById);
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.updateScribbleById = async function(req, res) {
  const updated = {
    title: req.body.title
  };

  if(req.file) {
    updated.imgSrc = req.file.path;
  };

  try {
    const scribble = await Scribble.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    );
    res.status(201).json(scribble);
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.deleteScribbleById = async function(req, res) {
  try {
    const scribble = await Scribble.remove({_id: req.params.id});
    res.status(200).json({
      message: 'Scribble delete'
    });
  } catch(e) {
    errorHandler(res, e);
  }
};