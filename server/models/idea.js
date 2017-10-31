import mongoose, { Schema } from 'mongoose';
import ideaMethods from './methods/ideaMethods';

// Create the schema for the Ideas collection
const ideaSchema = new Schema({
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

  description: {
    type: String,
    required: true,
    unique: false
  },

  agreement: {
    type: String,
    required: true,
    unique: false
  },

  created_ts: {
    type: Date,
    required: false,
    unique: false
  },

  tags: [{
    type: String,
    required: false,
    unique: false
  }],

  documents: {
    url_description: {
      type: String,
      required: true,
      unique: false
    },

    url: {
      type: String,
      required: true,
      unique: false
    },
  },

  reviews: [{
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
  }],
},{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});


/**
 * @description Produce the idea's current status as a virtual field in the 
 * schema. By design there is no cooresponding setter function so this field should
 * not be used for updates.
 * @returns {String} An array of ideas, each described by its title, type, status,
 * and status date. Values are 'Created', 'Assigned', or 'Reviewed'.
 * @memberof ideaSchema
 */
ideaSchema.virtual('status')
.get(function() {
  console.log('Entered getStatus. this.reviews: ',this.reviews, ' this.created_ts: ',this.created_ts);  
  if (this.reviews === undefined) {
    return 'Created';
  }
  /*
  if (this.reviews.review_comments.length === 0) {
    return 'Assigned';
  }
  */
  return 'Reviewed';
});

ideaSchema.virtual('status_dt')
.get(function() {
  console.log('Entered getStatus_dt. this.creator_id: ',this.creator_id, ' this.created_ts: ',this.created_ts);
  /*
  if (this.reviews === undefined) {
    return this.created.ts;
  }
  const lastElementPos = reviews.length-1;
  console.log('lastElementPos: ', lastElementPos);
  if (this.reviews.review_comments.length === 0) {
    return reviews[lastElementPos].assigned_ts;
  }
  return reviews[lastElementPos].updated_ts;
  */
  return this.created_ts;
});
// Create a model for the schema
ideaSchema.loadClass(ideaMethods);
const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;
