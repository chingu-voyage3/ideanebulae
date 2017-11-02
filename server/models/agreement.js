import mongoose, { Schema } from 'mongoose';
import agreementMethods from './methods/agreementMethods';

const agreementSchema = new Schema({
  // Create the schema for the User collection
  _id: {
    type: Schema.Types.ObjectId,
  },

  creator_id: {
    type: String,
    required: true,
    unique: true
  },

  title: {
    type: String,
    required: true,
    unique: false
  },

  type: {
    type: String,
    enum: ['public', 'private', 'commercial',],
    required: true,
    unique: false
  },

  agreement: {
    type: String,
    required: true,
    unique: false
  },

  agreement_version: {
    type: Number,
    required: true,
    unique: false
  },

  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'Idea'
  },

});

// Create a model for the schema
agreementSchema.loadClass(userMethods);
const Agreement = mongoose.model('Agreement', agreementSchema);

export default Agreement;
