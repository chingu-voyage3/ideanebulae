export default class ideaMethods {
  // List all the ideas in the ideas collection
  static async listIdeas() {
    return await this.find();
  }

  // Finds an idea using the ObjectID
  static async findIdea (ideaID) {
    return await this.findById(ideaID);
  }

  // Saves an idea to the collection
  static async saveIdea(body) {
    let { creator_id, title, type, description } = body;
    let idea = new Idea();

    idea.creator_id = creator_id;
    idea.title = title;
    idea.type = type;
    idea.description = description;

    return await this.save();
  }
}
