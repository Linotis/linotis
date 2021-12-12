const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scribbleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    default: ''
  },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection'
  }
});

module.exports = mongoose.model('Scribble', scribbleSchema);