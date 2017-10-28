import mongoose, { Schema } from 'mongoose';
import userMethods from './methods/userMethods';

// Create the schema for the User collection
const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },

  user_id: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true,
    unique: false,
  },

  avatar_url: {
    type: String,
    required: true,
    unique: false
  },

  qualifications: {
    type: String,
    required: false,
    unique: false
  },
});

// Create a model for the schema
userSchema.loadClass(userMethods);
const User = mongoose.model('User', userSchema);

export default User;
