import mongoose from "mongoose";

const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  name: {
    type: String
  },
  scribbles: [{
    ref: 'Scribble',
    type: mongoose.Schema.Types.ObjectId
  }]
});

export default mongoose.model('Collection', collectionSchema);