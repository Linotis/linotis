import mongoose from "mongoose";
import ICollection from "./collection.interface";

const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  scribbles: [{
    ref: 'Scribble',
    type: mongoose.Schema.Types.ObjectId
  }],
  languageId: {
    ref: 'Language',
    type: mongoose.Schema.Types.ObjectId
  }
});

export default mongoose.model<ICollection & mongoose.Document>('Collection', collectionSchema);