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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection'
  }
});

export default mongoose.model('Scribble', scribbleSchema);