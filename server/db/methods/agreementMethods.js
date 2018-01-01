const models = require('../models');
import Idea from '../models/idea';

export default class agreementMethods {

  /**
   * @description Delete an agreement document. Note that it is the responsibility of the
   * caller to clear the agreement id from the owning idea document.
   * @static
   * @param {String} creator Creator id of the owning idea
   * @param {String} title Title of the owning idea
   * @param {String} type Type of the owning idea
   * @returns {Promise} A WriteOpResult object containing the status of the operation
   * @memberof agreementMethods
   */
  static async deleteAgreement(creator, title, type) {
    return await this.deleteOne({
      creator: creator,
      title: title,
      type: type
    });
  }
  
  /**
   * @description Retrieve an agreement document based on its '_id' field
   * @param {any} agreementID The '_id' value of the agreement document to be located
   * @returns {Promise} A WriteResult object containing the status of the operation
   * @memberof agreementMethods
   */
  static async findAgreement(agreementID) {
    return await this.findById(agreementID);
  }

  /**
   * @description Retrieve all agreements associated with a given idea.
   * @param {any} ideaId The id value of the owning idea
   * @returns {Object} An object containing all agreements realated to the idea id
   * @memberof agreementMethods
   */
  static async findByIdea(ideaId) {
    return await models.sequelize.query(
      `SELECT id, \
              username, \
              idea_id, \
              idea_title, \
              idea_type, \
              agreement, \
              version \
          FROM idea_agreements \
          WHERE idea_id = ${ideaId}`,
      { type: models.sequelize.QueryTypes.SELECT}
    );
  }

  /**
   * @description Add an agreement document to the database. It is expected that the
   * parent idea document will already exist in the database.
   * @param {Object} body An object containing all agreement fields.
   * @returns {Promise} A WriteResult object containing the status of the operation
   * @memberof agreementMethods
   */
  static async saveAgreement(body) {
    let { creator, title, type, agreement, agreement_version} = body;
    let newAgreement = new this();
    
    newAgreement.creator = creator;
    newAgreement.title = title;
    newAgreement.type = type;
    newAgreement.agreement = agreement;
    newAgreement.agreement_version = agreement_version;
    return await newAgreement.save();
  }

}
