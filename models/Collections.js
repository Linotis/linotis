const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionItemSchema = new Schema({
  name: {
    type: String
  },
  imgSrc: {
    type: String,
    default: ''
  }
});

const collectionSchema = new Schema({
  name: {
    type: String
  },
  list: [collectionItemSchema]
});

const CollectionItem = mongoose.model('collectionItem', collectionItemSchema);
const Collection = mongoose.model('collection', collectionSchema);

module.exports = { CollectionItem, Collection };