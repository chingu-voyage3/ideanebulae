import mongoose, { Schema } from 'mongoose';

// Create the schema for the User collection
const userSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },

  user_name: {
    type: String,
    required: true,
    unique: false
  },

  security_id: {
    type: String,
    required: true,
    unique: true
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
}, { collection: 'users' });

// Create a model for the schema
const User = mongoose.model('User', userSchema);

export default User;
