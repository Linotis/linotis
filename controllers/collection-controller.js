const {Collection, CollectionItem} = require('../models/Collections');

module.exports.getAllCollections = async function(req, res) {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch(e) {
    console.log(e);
  }   
};

module.exports.getCollectionById = async function(req, res) {
  try {
    const collection = await Collection.findById(req.params.id);
    res.status(200).json(collection);
  } catch(e) {
    console.log(e);
  }
};

module.exports.createCollection = async function(req, res) {
  try {
    const collection = await new Collection({
      name: req.body.name,
      list: req.body.list
    }).save();
    
    res.status(201).json(collection);
  } catch(e) {
    console.log(e);
  }
}