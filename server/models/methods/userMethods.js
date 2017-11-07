export default class userMethods {
  // Returns a list of all the users in the database
  static async listUsers() {
    return await this.find();
  }

  // Finds an user using the id
  static async findUser(username) {
    return await this.findOne({username: username});
  }

  // Update a user if it exists, otherwise insert it
  static async createOrUpdateUser(userId, profileData) {
    const profile = {
      user_id: profileData.sub,
      username: profileData.nickname,
      name: profileData.name,
      avatar_url: profileData.picture,
      qualifications: profileData.qualifications,
    };

    return await this.updateOne(
      { user_id: userId },
      profileData,
      { upsert: true, new: true, runValidators: true }
    );
  }
}