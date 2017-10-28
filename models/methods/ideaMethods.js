export default class ideaMethods {
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

  // Finds an idea using the ObjectID
  static async findIdea(ideaID) {
    return await this.findById(ideaID);
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
}
