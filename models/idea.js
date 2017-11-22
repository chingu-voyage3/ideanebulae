import mongoose, { Schema } from 'mongoose';
import ideaMethods from './methods/ideaMethods';

// Create the schema for the Ideas collection
const ideaSchema = new Schema({
  creator: {
    type: String,
    required: true,
    ref: 'User'
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
    type: Schema.Types.ObjectId,
    ref: 'Agreement',
    default: null
  },

  created_ts: {
    type: Date,
    default: Date.now,
    unique: false
  },

  tags: [{
    type: String,
    required: false,
    unique: false
  }],

  documents: [{
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
  }],
    
  // It is expected that the reviews field will contain one and only one review per reviewer.
  // New reviews are always pushed to the end of the array
  reviews: [{
    reviewer: {
      type: String,
      required: true,
      unique: true
    },

    assigned_ts: {
      type: Date,
      default: Date.now,
      unique: false
    },

    updated_ts: {
      type: Date,
      default: Date.now,
      unique: false
    },

    comments: {
      type: String,
      default: '',
      unique: false
    },
  }],
},{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

// Constants required by virtual typeCode field getter and setter
const PUBLIC_IDEA = 0;
const PRIVATE_IDEA = 1;
const COMMERCIAL_IDEA = 2;
const IDEA_TYPES = [
  { type: PUBLIC_IDEA, name: 'public' },
  { type: PRIVATE_IDEA, name: 'private' },
  { type: COMMERCIAL_IDEA, name: 'commercial' },
];

ideaSchema.virtual('typeCode')
.get(function() {
  /**
   * @description Return a numeric code representing the idea type.
   * @returns {String} typeCode A numeric type code cooresponding to the idea type in the
   * idea document.
   * @memberof ideaSchema
   */
  const typeIndex = IDEA_TYPES.findIndex(element =>
    element.name === this.type,
  );
  if (typeIndex === -1) {
    throw new Error(`Invalid idea type encountered calculating virtual typeCode. type: ${this.type}`);
  }
  return IDEA_TYPES[typeIndex].type;
})
.set(function(valueToSet) {
  /**
   * @description Set the idea type in this document based on its cooresponding numeric type code.
   * @memberof ideaSchema
   */
  const typeIndex = IDEA_TYPES.findIndex(element =>
    element.type === valueToSet,
  );
  if (typeIndex === -1) {
    throw new Error(`Invalid type code encountered setting idea document type. valueToSet: ${valueToSet}`);
  }
  this.type = IDEA_TYPES[typeIndex].name;
});


/**
 * @description Produce the idea's current status as a virtual field in the
 * schema. By design there is no cooresponding setter function so this field should
 * not be used for updates.
 * @returns {String} The status value: 'Created', 'Assigned', or 'Reviewed'.
 * @memberof ideaSchema
 */
ideaSchema.virtual('status')
.get(function() {
  if (this.reviews.length === 0) {
    return 'Created';
  }
  if (this.reviews[this.reviews.length-1].comments.length === 0) {
    return 'Assigned';
  }
  return 'Reviewed';
});

/**
 * @description Produce the date for the idea's current status as a virtual
 * field in the schema. By design there is no cooresponding setter function
 * so this field should not be used for updates.
 * @returns {String} The status date in the format 'yyyy-mm-ddThh:mm:ss'
 * @memberof ideaSchema
 */
ideaSchema.virtual('status_dt')
.get(function() {
  if (this.reviews.length === 0) {
    return this.created_ts;
  }
  const lastElementPos = this.reviews.length-1;
  if (this.reviews[lastElementPos].comments.length === 0) {
    return this.reviews[lastElementPos].assigned_ts;
  }
  return this.reviews[lastElementPos].updated_ts;
});

// Create a model for the schema
ideaSchema.loadClass(ideaMethods);
const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;
