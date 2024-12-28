import { sequelize } from "../libs/sequelize.js";
import { DataTypes, Model } from "sequelize";
import { Status } from "./StatusModel.js";
export class Category extends Model {
  static async create(product) {
    try {
      const request = await pool.request();
      Object.entries(product).forEach(([key, value]) => {
        request.input(key, value);
      });

      await request.execute("sp_register_products_categories");
    } catch (error) {
      throw error;
    }
  }

  static async update(product) {
    try {
      const request = await pool.request();
      Object.entries(product).forEach(([key, value]) => {
        request.input(key, value);
      });

      await request.execute("sp_update_products_categories");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async remove(status_id, product_id) {
    try {
      const request = await pool.request();
      request.input("status_id", status_id);
      request.input("product_id", product_id);

      await request.execute("sp_update_product_status");
    } catch (error) {
      throw error;
    }
  }
}

Category.init(
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
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "products_categories",
    timestamps: false,
  }
);

Category.belongsTo(Status, {
  foreignKey: "status_id", as: "status"
});