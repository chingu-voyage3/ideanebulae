import Profile from '../profile';

export default class userMethods {
  // Returns a list of all the users in the database
  static async listUsers() {
    return await this.findAll({
      order: [ ['user_id', 'ASC'] ],
    });
  }

  // Finds an user using the id
  static async findUser(username) {
    return await Profile.findOne({
      where: { username: username},
    });
  }

  // Finds an user using the sub property
  // provided by the JWT token
  static async findUserBySub(sub) {
    return await this.findOne({user_id: sub});
  }

  // Update a user if it exists, otherwise insert it
  static async createOrUpdateUser(userId, profileData) {
    const profileColumns = {
      user_id: profileData.sub,
      username: profileData.nickname,
      name: profileData.name,
      avatar_url: profileData.picture,
      qualifications: profileData.qualifications,
    };

    return await Profile.findOrCreate({
      where: { user_id: userId },
      defaults: profileColumns,
    });
  }
}
