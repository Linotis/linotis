const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  name: {
    type: String
  },
  id: {
    type: Number
  },
  list: [
    {
      id: {
        type: Number
      },
      name: {
        type: Number
      },
      imgSrc: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model('collections', collectionSchema);