const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the schema for the Ideas collection
const ideaSchema = new Schema({
  creator_id: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: false },
  type: { type: String, enum: ['public', 'private', 'commercial',], required: true, unique: false },
  description: { type: String, required: true, unique: false },
  documents: { 
    url_description: { type: String, required: true, unique: false },
    url: { type: String, required: true, unique: false },
  },
  agreement: { type: String, required: true, unique: false },
  tags: [{ type: String, required: false, unique: false }],
  reviews: [{
    reviewer_id: { type: String, required: true, unique: true },
    assigned_ts: { type: Date, required: false, unique: false },
    updated_ts: { type: Date, required: true, unique: false },
    review_comments: { type: String, required: true, unique: false },
  }]
});

// Create a model for the schema
const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;