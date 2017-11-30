import Agreement from '../agreement';
import User from '../user';
import {PUBLIC_IDEA, PRIVATE_IDEA, COMMERCIAL_IDEA, IDEA_TYPES} from '../ideaConstants';

export default class ideaMethods {

  /**
   * @description Add a new review to an existing idea. 
   * @static
   * @param {String} creator The creator of the idea
   * @param {String} title The ideas title
   * @param {String} type The ideas type value
   * @param {String} reviewer The reviewer id
   * @param {String} comments The reviewers comments on the idea
   * @returns  {Promise} The updated idea document when resolved
   * @memberof ideaMethods
   */
  static async addReview(creator, title, type, reviewer, comments) {
    let deferredAdd = null;
    let addPromise = new Promise((resolve, reject) => {
      deferredAdd = ({resolve: resolve, reject: reject});
    })
    this.findIdea(creator, title, type)
    .then(idea => {
      const theIdea = JSON.stringify(idea[0]);
      // Verify that the reviewer hasn't already reviewed this idea
      const indexOfReview = idea[0].reviews.findIndex(element => {
        element.viewer === reviewer;
      });
      if (indexOfReview !== -1) {
        throw new Error('Add cannot be completed. Reviewer already in reviews: ', idea.reviews[indexOfReview]);
      }

      // Add the review to the idea
      const review = {
        reviewer: reviewer,
        assigned_ts: Date.now(),
        updated_ts: Date.now(),
        comments: comments
      };
      this.updateOne(
        {
          creator: creator,
          title: title,
          type: type
        },
        {
          $push: { "reviews": review }
        },
        { upsert: false, new: true, runValidators: true }
      )
      .then(updatedIdea => {
        deferredAdd.resolve(updatedIdea);
      })
      .catch(err => {
        throw new Error('Failure attempting to update idea document: ', err);            
      });
    })
    .catch(err => {
      throw new Error('Failure reading the idea the review is to be added to: ', err);            
    });
    return await addPromise;
  }

  /**
   * @description Delete an idea document from the database. If the idea also
   * has an associated agreement document it will be removed prior to deleting
   * its owning idea document.
   * @static
   * @param {String} ideaId the '_id' value of the document to be deleted
   * @returns {Promise} The idea document
   * @memberof ideaMethods
   */
  static async deleteIdea(ideaId) {
    let deferredDelete= null;
    let ideaPromise = new Promise((resolve, reject) => {
      deferredDelete = ({resolve: resolve, reject: reject});
    });

    // Retrieve the idea document to determine if it owns and agreement
    this.findIdea(ideaId)
    .then(idea => {
      // If an Agreement document is associated with this Idea delete it before
      // attempting to delete its parent Idea document
      let deferredAgreement = null;
      let agreementPromise = new Promise((resolve, reject) => {
        deferredAgreement = ({resolve: resolve, reject: reject});
      });
      if (idea.agreement === null) {
        deferredAgreement.resolve('No agreement');
      } else {
        Agreement.deleteAgreement(idea.creator, idea.title, idea.type)
        .then(deleteAgreementResult => {
          if (!deleteAgreementResult.result.ok) {
            throw new Error('Attempting to delete agreement document');
            deferredAgreement.reject('Attempting to delete agreement document');
          }
          deferredAgreement.resolve(deleteAgreementResult);
        })
        .catch(err => {
          throw new Error(`Attempting to delete agreement document: ${err}`);            
          deferredAgreement.resolve(err);
        });
      }
      // Attempt to delete the Idea document
      agreementPromise
      .then((result) => {
        this.deleteOne({
            _id: ideaId,
        })
        .then((deleteResult) => {
          deferredDelete.resolve(deleteResult);
        })
        .catch((err) => {
          throw new Error(`Attempting to delete idea document: ${err}`);
          deferredDelete.reject(err);
        });
      })
      .catch((err) => {
        throw new Error('Unable to delete associated agreement.');
        deferredDelete.reject(err);
      });
    })
    .catch(err => {
      throw new Error(`Unable to retrieve idea by its id: ${ideaId}`);
      deferredDelete.reject(err);
    });

    return ideaPromise;
  }

  /**
   * @description Retrieve an idea document based on its '_id' field
   * @static
   * @param {String} ideaId The '_id' value of the idea document
   * @returns {Promise} The matching idea document
   * @memberof ideaMethods
   */
  static async findIdea(ideaId) {
    return await this.findById(ideaId)
    .populate('agreement')
    .exec();
  }

  /**
   * @description Retrieve an idea document based on the value of its creator_id,
   * title, and type fields
   * @static
   * @param {String} creator The creator of the idea
   * @param {String} title The ideas title
   * @param {String} type The ideas type value
   * @returns  {Promise} The matching idea document
   * @memberof ideaMethods
   */
  static async findIdea(creator, title, type) {
    return await this.find({
      creator: creator,
      title: title,
      type: type,
    })
    .populate('agreement')
    .exec();
  }

  /**
   * @description Retrieve all unique idea tags from the database
   * @static
   * @returns {Promise} An array containing the unique tags in ascending sequence
   * @memberof ideaMethods
   */
  static async getAllTags() {
    return await this.find({})
    .distinct('tags')
    .exec();
  }

  /**
   * @description Retrieve all idea documents
   * @static
   * @returns  {Promise} An array containing all idea documents
   * @memberof agreementMethods
   */
  static async listIdeas() {
    return await this.find().exec();
  }

  /**
   * @description Replace the agreement reference field in the idea document with
   * a new agreement _id.
   * @static
   * @param {String} creator The creator of the idea
   * @param {String} title The ideas title
   * @param {String} type The ideas type value
   * @returns  {Promise} The updated idea document
   * @memberof ideaMethods
   */
  static async replaceIdeaAgreement(creator, title, type, agreement_id) {
    return await this.updateOne(
      {
        creator: creator,
        title: title,
        type: type
      },
      {
        agreement: agreement_id
      },
      { upsert: false, new: true, runValidators: true }
    );
  }

  /**
   * @description Add an idea document to the database. It is expected that the
   * parent user document for the creator and any reviewers will already exist in
   * the database.
   * @param {Object} body An object containing all idea fields except for referenced
   * documents.
   * @param {ObjectID} userId An ObjectID to populate referenced documents.
   * @returns  {Promise} A WriteResult object containing the status of the operation
   * @memberof agreementMethods
   */
  static async saveIdea(body, userId) {
    let { title, typeCode, description, documents, tags } = body;

    let idea = new this();
    idea.creator = userId;
    idea.title = title;
    idea.typeCode = typeCode;
    idea.description = description;
    idea.documents = documents;
    idea.tags = tags;
    idea.created_ts = Date.now();
    idea.agreement = null;
    return await idea.save();
  }

  /**
   * @description Find ideas based on a list of tags and keywords. Each idea
   * to be returned to the caller must be categorized with at least one tag or
   * contain at least one keyword in either the title or description field.
   * Note that the keyword search requires a full text index on the title and
   * description fields of the idea collection.
   * @param {String} currUserNickname The nickname of the currently logged on user
   * @param {String} tags A list of comma-separated unique tags
   * @param {String} keywords A list of comma-separated of unique keywords
   * @returns {Promise} An array of ideas, each described by its title, type, status,
   * and status date
   * @memberof ideaMethods
   */
  static async searchIdeas(currUserNickname, searchForTags, searchForKeywords) {
    if (searchForTags.length === 0 && searchForKeywords.length === 0) {
      // Retrieve all ideas if no tags or keywords were provided since an
      // idea must match at least one of the provided tags (see below)
      return await this.find({})
      .populate('agreement')
      .sort({created_ts: -1})
      .exec();
    }
    return await this.find({
      $or: [
        {$text : {$search : searchForKeywords}},
        {tags: {$in: searchForTags.split(',')}}
      ]
    })
    .populate('agreement')
    .sort({created_ts: -1})    
    .exec();
  }

  /**
   * @description Update an idea. The following conditions are taken into consideration:
   * - Creators are not allowed to change, but it is included as the first parameter in the 
   * interest of orthoganality. Validate that the instances of creator in the parameters are
   * the same and that a User document exists for the creator.
   * - If the original idea type was changed from 'private' or 'commercial' to 'public'
   * delete the associated Agreement document.
   * - If the original idea type was changed from 'public' to 'private' or
   * 'commercial' add a new Agreement document.
   * - If the original idea type was not changed update the associated Agreement document.
   * @static
   * @param {String} origCreator The original creator of the idea
   * @param {String} origTitle The original title of the idea
   * @param {String} origType The original type value of the idea
   * @param {Object} newIdea The An object containing the properties and values of the idea.
   * The creator, title, and type fields are required. All other idea fields need only
   * be included if they have changed.
   * @returns  {Object} The updated idea document
   * @memberof ideaMethods
   */
  static async updateIdea(origCreator, origTitle, origType, newIdea) {
    // Verify that the creator hasn't changed and a User document exists for it.
    if (origCreator !== newIdea.creator) {
      throw new Error(`The creator field of an idea is not allowed to change. origCreator: ${origCreator} newIdea.creator: ${newIdea.creator}`);
    }

    // Create a Promise that will be resolved by one of the Agreement actions - delete, add, or update.
    let deferredAgreement = null;
    let agreementPromise = new Promise((resolve, reject) => {
      deferredAgreement = ({resolve: resolve, reject: reject});
    });

    let deferredUpdate = null;
    let updatePromise = new Promise((resolve, reject) => {
      deferredUpdate = ({resolve: resolve, reject: reject});
    })

    User.findUserBySub(origCreator)
    .then(user => {
      // If the original idea type was changed from 'private' or 'commercial' to 'public'
      // delete the associated Agreement document.
      if (['commercial', 'private'].includes(origType) &&
          newIdea.type === 'public') {
        Agreement.deleteAgreement(origCreator, origTitle, origType)
        .then(deleteAgreementResult => {
          if (!deleteAgreementResult.result.ok) {
            throw new Error(`Attempting to delete agreement document: ${err}`);
          }
          newIdea.agreement = null;
          deferredAgreement.resolve(deleteAgreementResult);
        })
        .catch(err => {
          throw new Error(`Attempting to delete agreement document: ${err}`);
          deferredAgreement.reject('Delete of agreement failed');
        });
      }
      // If the original idea type was changed from 'public' to 'private' or
      // 'commercial' add a new Agreement document.
      else if ( (origType === 'public' &&
                  ['commercial', 'private'].includes(newIdea.type) &&
                  newIdea.agreement !== undefined)  ||
                (newIdea.agreement !== undefined)
              ) {
        const agreement =  { 
          creator: newIdea.creator, 
          title: newIdea.title, 
          type: newIdea.type, 
          agreement: newIdea.agreement, 
          agreement_version: 0,
        };
        Agreement.saveAgreement(agreement)
        .then(addAgreementResult => {
          newIdea.agreement = addAgreementResult._id;
          deferredAgreement.resolve(addAgreementResult);
        })
        .catch(err => {
          throw new Error(`Adding new agreement document: ${err}`);
          deferredAgreement.reject('Add of agreement failed');            
        });
      }
      // If the original idea type was not changed update the associated Agreement document
      else if (origType === newIdea.type &&
               newIdea.agreement !== undefined) {
        console.log('Starting update of agreement...');
        const agreement =  { 
          creator: newIdea.creator, 
          title: newIdea.title, 
          type: origType, 
          agreement: newIdea.agreement, 
          agreement_version: 0,
        };
        Agreement.saveAgreement(agreement)
        .then(updateAgreementResult => {
          newIdea.agreement = updateAgreementResult._id;
          deferredAgreement.resolve(updateAgreementResult);
        })
        .catch(err => {
          throw new Error(`Updating new agreement document: ${err}`);
          deferredAgreement.reject('Agreement update failed');            
        });
      }
      // If no action is required against the Agreement simply resolve the deferred Promise
      else {
        deferredAgreement.resolve('No agreement action required');
      }

      // Update the Idea document with the new values
      agreementPromise.then(result => {
        this.updateOne(
          {
            creator: origCreator,
            title: origTitle,
            type: origType
          },
          { $set: newIdea },
          { upsert: false, new: true, runValidators: true }
        )
        .then((updateResult) => {
          deferredUpdate.resolve(updateResult);
        })
        .catch((err) => {
          throw new Error(`Attempting to update idea document: ${err}`);
          deferredUpdate.reject(err);
        });
      });
    })
    .catch(err => { 
      throw new Error(`User document not found for creator: ${origCreator} Error: ${err}`);
      deferredUpdate.reject(`User document not found for creator: ${origCreator}`);
    });

    return updatePromise;
  }

  /**
   * @description Update a review in an existing idea. 
   * @static
   * @param {String} creator The creator of the idea
   * @param {String} title The ideas title
   * @param {String} type The ideas type value
   * @param {String} reviewer The reviewer id
   * @param {String} comments The reviewers comments on the idea
   * @returns  {Promise} The updated idea document when resolved
   * @memberof ideaMethods
   */
  static async updateReview(creator, title, type, reviewer, comments) {
    let deferredUpdate = null;
    let updatePromise = new Promise((resolve, reject) => {
      deferredUpdate = ({resolve: resolve, reject: reject});
    })
    this.findIdea(creator, title, type)
    .then(idea => {
      this.updateOne(
        {
          creator: creator,
          title: title,
          type: type,
          "reviews.reviewer": reviewer
        },
        { $set: {
            "reviews.$.updated_ts" : Date.now(),
            "reviews.$.comments" : comments
          }
        },
        { upsert: false, new: true, runValidators: true }
      )
      .then(idea => {
        deferredUpdate.resolve(idea);
      })
      .catch(err => {
        throw new Error('Failure updating idea document: ', err);            
      });
    })
    .catch(err => {
      throw new Error('Failure to read the idea containing the review to be updated: ', err);            
    });
    return await updatePromise;
  } 
  
}
