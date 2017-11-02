import Idea from '../models/idea';

export default class agreementMethods {
  // Finds an idea using the ObjectID
  static async findAgreement(agreementID) {
    return await this.findById(agreementID);
  }

  // Saves an idea to the collection
  static async saveAgreement(body) {
    let { creator_id, title, type, agreement, agreement_version} = body;

    Idea.findIdea(creator_id, title, type)
    .then(idea => {
      let agreement = new this();
      
      agreement.creator_id = creator_id;
      agreement.title = title;
      agreement.type = type;
      agreement.agreement = agreement;
      agreement.agreement_version = agreement_version;
      agreement.idea = idea._id;
  
      return await agreement.save();      
    })
    .catch(err => console.log(`Error retrieving idea document in saveAgreement: ${err}`));
  }
  
}
