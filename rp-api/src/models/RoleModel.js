import { sequelize } from "../libs/sequelize.js";
import { DataTypes, Model } from "sequelize";

export class Role extends Model {
  static async create(role) {
    try {
      const request = await pool.request();
      Object.entries(role).forEach(([key, value]) => {
        request.input(key, value);
      });

      await request.execute("sp_create_role");
    } catch (error) {
      throw error;
    }
  }

  static async update(role) {
    try {
      const request = await pool.request();
      Object.entries(role).forEach(([key, value]) => {
        request.input(key, value);
      });

      await request.execute("sp_update_role");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

Role.init(
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
    tableName: "role",
    timestamps: false,
  }
);
