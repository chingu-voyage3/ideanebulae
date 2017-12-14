import Sequelize from "sequelize";
import db from "../services/db";
import Profile from "./profile";
import Idea from "./idea";

const sequelize = db.get();

const Review = sequelize.define(
  "review",
  {
    comment: {
      type: Sequelize.STRING,
      allowNull: false
    },

    profile_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: Profile,
        key: "id"
      }
    },

    idea_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: Idea,
        key: "id"
      }
    }
  },
  {
    underscored: true
  }
);

Review.belongsTo(Profile);
Review.belongsTo(Idea);

export default Review;
