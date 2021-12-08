const Collection = require('../models/Collection');
const errorHandler = require('../utils/errorHandler');

module.exports.getAllCollections = async function(req, res) {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch(e) {
    errorHandler(res, e);
  }   
};

module.exports.getCollectionById = async function(req, res) {
  try {
    const collection = await Collection.findById(req.params.id).populate('scribbles');
    res.status(200).json(collection);
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.createCollection = async function(req, res) {
  try {
    const collection = await new Collection({
      name: req.body.name,
    }).save();
    res.status(201).json(collection);
  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.updateCollectionById = async function(req, res) {
  const updated = {
    name: req.body.name
  };

  try{
    const collection = await Collection.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    );
    res.status(201).json(collection);
  } catch(e){
    errorHandler(res, e);
  }
}

module.exports.deleteCollectionById = async function(req, res) {
  try {
    const collection = await Collection.remove({_id:req.params.id});
    res.status(200).json({
      message: 'Collection delete'
    });
  } catch(e) {
    errorHandler(res, e);
  }
}
