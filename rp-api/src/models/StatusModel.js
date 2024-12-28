import { Model, DataTypes } from "sequelize";
import { sequelize } from "../libs/sequelize.js";

export class Status extends Model {}

Status.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "status",
    timestamps: false,
  }
);
