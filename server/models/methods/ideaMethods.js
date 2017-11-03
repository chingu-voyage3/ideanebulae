export default class ideaMethods {
  /**
   * @description Retrieve an idea document based on its '_id' field
   * @static
   * @param {any} agreementID The '_id' value of the agreement document
   * @returns  {Promise} The matching idea document
   * @memberof agreementMethods
   */
  static async findIdea(ideaID) {
    return await this.findById(ideaID);
  }

  /**
   * @description Retrieve an idea document based on the value of its creator_id,
   * title, and type fields
   * @static
   * @param {String} creator_id The creator of the idea
   * @param {String} title The ideas title
   * @param {String} type The ideas type value
   * @returns  {Promise} The matching idea document
   * @memberof agreementMethods
   */
  static async findIdea(creator_id, title, type) {
    return await this.findIdea()
    .where('creator_id').equals(creator_id)
    .where('title').equals(title)
    .where('type').equals(type)
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
   */  static async listIdeas() {
    return await this.find();
  }

  /**
   * @description Add an idea document to the database. It is expected that the
   * parent user document for the creator and any reviewers will already exist in 
   * the database.
   * @param {Object} body An object containing all idea fields except for references.
   * @returns  {Promise} A WriteResult object containing the status of the operation
   * @memberof agreementMethods
   */
  static async saveIdea(body) {
    let { creator_id, title, type, description, documents, agreement } = body;
    let idea = new this();

    idea.creator_id = creator_id;
    idea.title = title;
    idea.type = type;
    idea.description = description;
    idea.documents = documents;
    idea.agreement = agreement;

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
   * @param {String} currentuserNickname The nickname of the currently logged on user
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
          {type: {$in: ['private', 'commercial']}, creator_id: currUserNickname},
          {type: {$in: ['private', 'commercial']}, reviews: {reviewer_id: currUserNickname }},
        ],
      }).exec();
    }
    return await this.find({
      $and: [
        { $or: [
            {$text : {$search : searchForKeywords}},
            {tags: {$in: searchForTags.split(',')}},
        ]},
        { $or: [
          {type: 'public'},
          {type: {$in: ['private', 'commercial']}, creator_id: currUserNickname},
          {type: {$in: ['private', 'commercial']}, reviews: {reviewer_id: currUserNickname }},
        ]},
      ]
    })
    .exec();
  }
  
}
