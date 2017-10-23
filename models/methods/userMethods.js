export default class userMethods {
  // Returns a list of all the users in the database
  static async listUsers() {
    return await this.find();
  }

  // Finds an user using the id
  static async findUser(userId) {
    console.log(`Made it to findUser - userId:${userId}`);
    return await this.findOne({'user_id': userId});
  }

  // Update a user if it exists, otherwise inserts it
  static async createOrUpdateUser(userProfile) {
    console.log(`Made it to createOrUpdateUser. userProfile.userId: ${userProfile.userId}`);
    console.log(userProfile);
    return await this.findOneAndUpdate(
      {'user_id': userProfile.userId},
      userProfile,
      { upsert: true }
    );
  }
  
}
