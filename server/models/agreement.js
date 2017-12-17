import Sequelize from "sequelize";
import db from "../services/db";
import Profile from "./profile";
import Idea from "./idea";

let Agreement = null;

const getAgreement = () => {
  return db.get().define(
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
          key: "user_Id"
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

const defineAgreementRelations = () => {
  Agreement.belongsTo(Profile);
  Agreement.belongsTo(Idea);
};

export default { Agreement, getAgreement, defineAgreementRelations };
