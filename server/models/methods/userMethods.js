export default class userMethods {
  // Returns a list of all the users in the database
  static async listUsers() {
    return await this.find();
  }

  // Finds an user using the id
  static async findUser(userId) {
    return await this.findOne({'user_id': userId});
  }
}
