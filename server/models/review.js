import mongoose, { Schema } from 'mongoose';
import reviewMethods from './methods/reviewMethods';

// Create the schema for the Ideas collection
const reviewSchema = new Schema({
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

  reviewer_id: {
    type: String,
    required: true,
    unique: true
  },

  assigned_ts: {
    type: Date,
    required: false,
    unique: false
  },

  updated_ts: {
    type: Date,
    required: true,
    unique: false
  },

  review_comments: {
    type: String,
    required: true,
    unique: false
  },
});

// Create a model for the schema
reviewSchema.loadClass(reviewMethods);
const Review = mongoose.model('Review', reviewSchema);

export default Review;
