export default class userMethods {
  // Returns a list of all the users in the database
  static async listUsers() {
    return await this.find();
  }

  // Finds an user using the id
  static async findUser(userId) {
    return await this.findOne({'user_id': userId});
  }

  // Update a user if it exists, otherwise inserts it
  static async createOrUpdateUser(userId, userProfile) {
    return await this.findOneAndUpdate(
      {'user_id': userId},
      userProfile,
      { upsert: true }
    );
  }
  
}
