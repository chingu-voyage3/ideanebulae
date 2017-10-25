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
  static async createOrUpdateUser(currId, profileData) {
    console.log(`Made it to createOrUpdateUser.\n...currId: ${currId}\n...profileData: ${profileData}`);
    let user = new this();
    user.qualifications = profileData.qualifications;
    delete this._id;
    return await this.findOneAndUpdate(
      { user_id: currId },
      user,
      { upsert: false, new: true, runValidators: true }
    ).exec();
  }
}
