import Idea from '../idea';

export default class agreementMethods {
  
  /**
   * @description Retrieve an agreement document based on its '_id' field
   * @param {any} agreementID The '_id' value of the agreement document
   * @returns  {Promise} A WriteResult object containing the status of the operation
   * @memberof agreementMethods
   */
  static async findAgreement(agreementID) {
      return await this.findById(agreementID);
    }

  /**
   * @description Add an agreement document to the database. It is expected that the
   * parent idea document will already exist in the database.
   * @param {Object} body An object containing all agreement fields except for references.
   * @returns  {Promise} A WriteResult object containing the status of the operation
   * @memberof agreementMethods
   */
  static async saveAgreement(body) {
    let { creator_id, title, type, agreement, agreement_version} = body;

    // Retrieve the parent idea before saving the new agreement
    // document to the database
    Idea.findIdea(creator_id, title, type)
    .then(idea => {
      let agreement = new this();
      
      agreement.creator_id = creator_id;
      agreement.title = title;
      agreement.type = type;
      agreement.agreement = agreement;
      agreement.agreement_version = agreement_version;
      const agreementResult = agreement.save();
      agreementResult
      .then(agreement => {
        Idea.replaceIdeaAgreement(creator_id, title, type, agreement._id)
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

}
