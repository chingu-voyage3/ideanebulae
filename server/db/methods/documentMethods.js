const models = require('../models');

export default class documentMethods {

  /**
   * @description Retrieve all documents associated with a given idea.
   * @param {any} ideaId The id value of the owning idea
   * @returns {Object} An object containing all documents realated to the idea id
   * @memberof agreementMethods
   */
  static async findByIdea(ideaId) {
      return await models.sequelize.query(
        `SELECT id,
                username,
                idea_id,
                title,
                idea_type,
                url,
                description
           FROM idea_documents \
           WHERE idea_id = ${ideaId}`,
        { type: models.sequelize.QueryTypes.SELECT});
  }
}
