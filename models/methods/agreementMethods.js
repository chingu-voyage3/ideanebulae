import Idea from '../idea';

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
   * @description Add an agreement document to the database. It is expected that the
   * parent idea document will already exist in the database.
   * @param {Object} body An object containing all agreement fields.
   * @returns {Promise} A WriteResult object containing the status of the operation
   * @memberof agreementMethods
   */
  static async saveAgreement(body) {
    let { creator, title, type, agreement, agreement_version} = body;

    // Retrieve the parent idea before saving the new agreement
    // document to the database
    Idea.findIdea(creator, title, type)
    .then(idea => {
      let agreement = new this();
      
      agreement.creator = creator;
      agreement.title = title;
      agreement.type = type;
      agreement.agreement = agreement;
      agreement.agreement_version = agreement_version;
      const agreementResult = agreement.save();
      agreementResult
      .then(agreement => {
        Idea.replaceIdeaAgreement(creator, title, type, agreement._id)
        .then(idea => {
          return agreementResult;
        })
        .catch(err => {
          throw new Error(`Failure when attempting to update agreement reference in idea document: ${err}`);
        });
      })
      .catch(err => {
        throw new Error(`Error saving new agreement document: ${err}`);
      });
    })
    .catch(err => {
      throw new Error(`Error retrieving parent idea for agreement document: ${err}`);
    });
  }

  /**
   * @description Update an agreement document to the database. It is expected that the
   * parent idea document will already exist in the database.
   * @param {Object} body An object containing the agreement fields.
   * @returns {Promise} A WriteResult object containing the status of the operation
   * @memberof agreementMethods
   */
  static async updateAgreement(body) {
    let { creator, title, type, agreement, agreement_version} = body;

      let agreement = new this();
      
      agreement.creator = creator;
      agreement.title = title;
      agreement.type = type;
      agreement.agreement = agreement;
      agreement.agreement_version = agreement_version;
      return await agreement.save();
  }

}
