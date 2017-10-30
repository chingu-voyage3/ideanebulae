import mongoose, { Schema } from 'mongoose';
import userMethods from './methods/userMethods';

const userSchema = new Schema({
  // Create the schema for the User collection
  _id: {
    type: Schema.Types.ObjectId,
  },

  // Unique intneranl Auth0 user identifier (Auth0 sub field)
  user_id: {
    type: String,
    required: true,
    unique: true
  },

  // User name used for authentication (Auth0 nickname field)
  username: {
    type: String,
    required: true,
    unique: true
  },

  // User full name (Auth0 name field)
  name: {
    type: String,
    required: true,
    unique: false,
  },

  // User's social media avatar (Auth0 picture field)
  avatar_url: {
    type: String,
    required: true,
    unique: false
  },

  // User's qualification description 
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
