import { sequelize } from "../libs/sequelize.js";
import { DataTypes, Model } from "sequelize";
import { User } from "./UserModel.js";

export class Client extends Model {}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    social_reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comertial_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "clients",
    timestamps: false,
  }
);
