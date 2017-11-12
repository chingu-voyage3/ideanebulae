import Agreement from '../agreement';

export default class ideaMethods {
  /**
   * @description Retrieve an idea document based on its '_id' field
   * @static
   * @param {any} ideaId The '_id' value of the idea document
   * @returns  {Promise} The matching idea document
   * @memberof ideaMethods
   */
  static async findIdea(ideaId) {
    return await this.findById(ideaId)
    .populate('agreement')
    .exec();
  }

  /**
   * @description Retrieve an idea document based on the value of its creator_id,
   * title, and type fields
   * @static
   * @param {String} creator The creator of the idea
   * @param {String} title The ideas title
   * @param {String} type The ideas type value
   * @returns  {Promise} The matching idea document
   * @memberof ideaMethods
   */
  static async findIdea(creator, title, type) {
    return await this.find({
      creator: creator,
      title: title,
      type: type,
    })
    .populate('agreement')
    .exec();
  }

  /**
   * @description Retrieve all unique idea tags from the database
   * @static
   * @returns {Promise} An array containing the unique tags in ascending sequence
   * @memberof ideaMethods
   */
  static async getAllTags() {
    return await this.find({})
    .distinct('tags')
    .exec();
  }

  /**
   * @description Retrieve all idea documents
   * @static
   * @returns  {Promise} An array containing all idea documents
   * @memberof agreementMethods
   */
  static async listIdeas() {
    return await this.find()
    .populate('agreement')
    .exec();
  }

  /**
   * @description Add an idea document to the database. It is expected that the
   * parent user document for the creator and any reviewers will already exist in 
   * the database.
   * @param {Object} body An object containing all idea fields except for referenced
   * documents.
   * @returns  {Promise} A WriteResult object containing the status of the operation
   * @memberof agreementMethods
   */
  static async saveIdea(body) {
    let { creator, title, type, description, documents, tags } = body;
    
    let idea = new this();
    idea.creator = creator;
    idea.title = title;
    idea.type = type;
    idea.description = description;
    idea.documents = documents;
    idea.tags = tags;
    idea.created_ts = Date.now();
    return await idea.save();
  }

  /**
   * @description Find ideas based on a list of tags and keywords. Each idea
   * to be returned to the caller must be categorized with at least one tag or
   * contain at least one keyword in either the title or description field and 
   * the specified user must be either the creator of the idea or one of its
   * reviewers if the idea type is anything other than 'public'.
   * Note that the keyword search requires a full text index on the title and
   * description fields of the idea collection.
   * @param {String} currUserNickname The nickname of the currently logged on user
   * @param {String} tags A list of comma-separated unique tags
   * @param {String} keywords A list of comma-separated of unique keywords
   * @returns {Promise} An array of ideas, each described by its title, type, status,
   * and status date
   * @memberof ideaMethods
   */
  static async searchIdeas(currUserNickname, searchForTags, searchForKeywords) {
    if (searchForTags.length === 0 && searchForKeywords.length === 0) {
      // Retrieve all ideas if no tags or keywords were provided since an 
      // idea must match at least one of the provided tags (see below)
      return await this.find({
        $or: [
          {type: 'public'},
          {type: {$in: ['private', 'commercial']}, creator: currUserNickname},
          {type: {$in: ['private', 'commercial']}, reviews: {$elemMatch: {reviewer: currUserNickname}}},
        ],
      })
      .populate('agreement')
      .exec();
    }
    return await this.find({
      $and: [
        { $or: [
            {$text : {$search : searchForKeywords}},
            {tags: {$in: searchForTags.split(',')}},
        ]},
        { $or: [
          {type: 'public'},
          {type: {$in: ['private', 'commercial']}, creator: currUserNickname},
          {type: {$in: ['private', 'commercial']}, reviews: {$elemMatch: {reviewer: currUserNickname}}},
        ]},
      ]
    })
    .populate('agreement')
    .exec();
  }

  /**
   * @description Replace the agreement reference field in the idea document with
   * a new agreement _id.
   * @static
   * @param {String} creator The creator of the idea
   * @param {String} title The ideas title
   * @param {String} type The ideas type value
   * @returns  {Promise} The updated idea document
   * @memberof ideaMethods
   */
  static async replaceIdeaAgreement(creator, title, type, agreement_id) {
    return await this.updateOne(
      {
        creator: creator,
        title: title,
        type: type
      },
      {
        agreement: agreement_id
      },
      { upsert: false, new: true, runValidators: true }
    );
  }

  /**
   * @description Add a new review to an existing idea. 
   * @static
   * @param {String} creator The creator of the idea
   * @param {String} title The ideas title
   * @param {String} type The ideas type value
   * @param {any} {"reviewer": reviewer, "assigned_ts": assigned_ts, "updated_ts": updated_ts, "comments": comments} The An object containing the properties and values in the
   * new reviews field entry of the idea schema.
   * @returns  {Promise} The updated idea document when resolved
   * @memberof ideaMethods
   */
  static async addIdeaReviewer(creator, title, type, reviewer) {
    console.log(`addIdeaReviewer - creator: ${creator} title: ${title} type: ${type} reviewer: ${reviewer}`);
    // TODO: Validate that reviewer doesn't already have an entry in the 'reviews' field.
    // It is expected that the reviews field will contain one and only one review per reviewer 
    const review = {
      "reviewer": reviewer,
      "assigned_ts": `${Date.now()}`,
      "updated_ts": `${Date.now()}`,
      "comments": ''
    };
    return await this.updateOne(
      {
        creator: creator,
        title: title,
        type: type
      },
      {
        $push: { "reviews": review }
      },
      { upsert: false, new: true, runValidators: true }
    );
  }    
}
