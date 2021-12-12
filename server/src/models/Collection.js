const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  name: {
    type: String
  },
  scribbles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scribble'
  }]
});

module.exports = mongoose.model('Collection', collectionSchema);