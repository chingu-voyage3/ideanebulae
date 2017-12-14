import Sequelize from "sequelize";
import db from "../services/db";
import Profile from "./profile";
import Idea from "./idea";

const sequelize = db.get();

const Agreement = sequelize.define(
  "agreement",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },

    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },

    agreement_type: {
      type: Sequelize.ENUM,
      values: ["public", "private", "commercial"],
      defaultValue: "public",
      allowNull: false
    },

    agreement: {
      type: Sequelize.STRING,
      allowNull: false
    },

    version: {
      type: Sequelize.INTEGER,
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

Agreement.belongsTo(Profile);
Agreement.belongsTo(Idea);

export default Agreement;
