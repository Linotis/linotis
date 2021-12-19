import mongoose from "mongoose";
import IScribble from "./scribble.interface";

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

export default mongoose.model<IScribble & mongoose.Document>('Scribble', scribbleSchema);