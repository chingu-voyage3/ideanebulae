import Sequelize from "sequelize";
import db from "../services/db";
import Profile from "./profile";
import Idea from "./idea";

let Review = null;

const getReview = () => {
  return db.get().define(
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
          key: "user_id"
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
      freezeTableName: true,
      underscored: true
    }
  );
};

const defineReviewRelations = () => {
  db.get().belongsTo(Profile);
  db.get().belongsTo(Idea);
};

export default { Review, getReview, defineReviewRelations };
