import mongoose from "mongoose";

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
    ref: 'Collection',
    type: mongoose.Schema.Types.ObjectId
  }
});

export default mongoose.model('Scribble', scribbleSchema);