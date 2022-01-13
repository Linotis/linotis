import mongoose from "mongoose";
import IUser from "./user.interface";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    default: 'student'
  },
  languages: [{
    ref: 'Language',
    default: '',
    type: mongoose.Schema.Types.ObjectId
  }]
});

export default mongoose.model<IUser & mongoose.Document>('users', userSchema);
