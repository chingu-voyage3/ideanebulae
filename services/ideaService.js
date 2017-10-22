import mongoose from 'mongoose';
import config from './mongoose.config';
import Idea from '../models/idea';

mongoose.connect(config.db.mongoURI, {
  useMongoClient: true
});

// See http://mongoosejs.com/docs/promises.html#plugging-in-your-own-promises-library
mongoose.Promise = global.Promise;

// List all the ideas in the ideas collection
export const listIdeas = async () => {
  return await Idea.find();
}

// Finds an idea using the ObjectID
export const findIdea = async (ideaID) => {
  return await Idea.findById(ideaID);
}

// Saves an idea to the collection
export const saveIdea = async (body) => {
  let { creator_id, title, type, description } = body;
  let idea = new Idea();

  idea.creator_id = creator_id;
  idea.title = title;
  idea.type = type;
  idea.description = description;

  return await idea.save();
}
