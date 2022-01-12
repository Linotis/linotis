import mongoose from "mongoose";
import ILanguage from "./language.interface";

const Schema = mongoose.Schema;

const languageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  }
});

export default mongoose.model<ILanguage & mongoose.Document>('Language', languageSchema);