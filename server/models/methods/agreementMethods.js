export default class agreementMethods {
  // Finds an idea using the ObjectID
  static async findAgreement(agreementID) {
    return await this.findById(agreementID);
  }

  // Saves an idea to the collection
  static async saveAgreement(body) {
    let { creator_id, title, type, agreement, agreement_version } = body;
    let agreement = new this();

    agreement.creator_id = creator_id;
    agreement.title = title;
    agreement.type = type;
    agreement.agreement = agreement;
    agreement.agreement_version = agreement_version;

    return await agreement.save();
  }
  
}
