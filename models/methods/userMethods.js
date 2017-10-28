export default class userMethods {
  // Returns a list of all the users in the database
  static async listUsers() {
    return await this.find();
  }

  // Finds an user using the id
  static async findUser(username) {
    return await this.findOne({'username': username});
  }

  // Update a user if it exists, otherwise inserts it
  static async createOrUpdateUser(username, profileData) {
    const profile = {
      user_id: profileData.sub,
      username: profileData.nickname,
      name: profileData.name,
      avatar_url: profileData.picture,
    };

    return await this.findOneAndUpdate(
      { username: username },
      profile,
      { upsert: true, new: true, runValidators: true }
    ).exec();
  }
}
