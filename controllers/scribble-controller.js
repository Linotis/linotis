const Collection = require('../models/Collection');
const Scribble = require('../models/Scribble');

module.exports.createScribble = async function(req, res) {
  try {
    const scribble = await new Scribble({
      title: req.body.title,
      imgSrc: req.body.imgSrc,
      collectionId: req.body.collectionId
    }).save();

    const collectionById = await Collection.findById(req.body.collectionId);
    collectionById.scribbles.push(scribble);
    await collectionById.save();
    
    res.status(200).json(collectionById);
  } catch(e) {
    console.log(e);
  }
}