const models = require('../models');

export default class reviewMethods {

  /**
   * @description Retrieve all reviews associated with a given idea.
   * @param {any} ideaId The id value of the owning idea
   * @returns {Object} An object containing all reviews related to the idea id
   * @memberof agreementMethods
   */
  static async findByIdea(ideaId) {
      return await models.sequelize.query(
        `SELECT id, \
                idea_id, \
                idea_creator, \
                idea_title, \
                idea_type, \
                reviewer_id, \
                reviewer, \
                comments, \
                created_at, \
                updated_at \
           FROM idea_reviews \
           WHERE idea_id = ${ideaId}`,
        { type: models.sequelize.QueryTypes.SELECT});
  }

}
