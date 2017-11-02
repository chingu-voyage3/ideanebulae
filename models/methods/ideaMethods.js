export default class ideaMethods {
  // Finds an idea using the ObjectID
  static async findIdea(ideaID) {
    return await this.findById(ideaID);
  }

  static async findIdea(creator_id, title, type) {
    return await this.findIdea()
    .where('creator_id').equals(creator_id)
    .where('title').equals(title)
    .where('type').equals(type)
    .exec();
  }

  // Get all unique tags referenced in all idea documents
  static async getAllTags() {
    return await this.find({})
    .distinct('tags')
    .exec();
  }

  // List all the ideas in the ideas collection
  static async listIdeas() {
    return await this.find();
  }

  // Saves an idea to the collection
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
   * contain at least one keyword in either the title or description field.
   * Note that the keyword search requires a full text index on the title and
   * description fields of the idea collection.
   * @param {String} tags A list of comma-separated unique tags
   * @param {String} keywords A list of comma-separated of unique keywords
   * @returns {Object[]} An array of ideas, each described by its title, type, status,
   * and status date
   * @memberof ideaMethods
   */
  static async searchIdeas(searchForTags, searchForKeywords) {
    if (searchForTags.length === 0 && searchForKeywords.length === 0) {
      // Retrieve all ideas if no tags or keywords were provided since an 
      // idea must match at least one of the provided tags (see below) 
      return await this.find({}).exec();
    }
    return await this.find({
      $or: [
        {$text : {$search : searchForKeywords}},
        {tags: {$in: searchForTags.split(',')}}
      ]
    })
    .exec();
  }
  
}
