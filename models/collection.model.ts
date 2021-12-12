import mongoose from "mongoose";

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

export default mongoose.model('Collection', collectionSchema);