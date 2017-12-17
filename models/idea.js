import Sequelize from "sequelize";
import db from "../services/db";
import Profile from "./profile";
import Agreement from "./agreement";
import Review from "./review";

let Idea = null;

const getIdea = () => {
  return db.get.define(
    "idea",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      idea_type: {
        type: Sequelize.ENUM,
        values: ["public", "private", "commercial"],
        defaultValue: "public",
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
      }
    },
    {
      freezeTableName: true,
      underscored: true
    }
  );
};

const defineIdeaRelations = () => {
  db.get().belongsTo(Profile);
  db.get().hasOne(Agreement);
  db.get().hasMany(Review);
};

export default { Idea, getIdea, defineIdeaRelations };
