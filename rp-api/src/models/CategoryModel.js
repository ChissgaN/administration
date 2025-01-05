import { sequelize } from "../libs/sequelize.js";
import { DataTypes, Model } from "sequelize";
import { Status } from "./StatusModel.js";
import { User } from "./UserModel.js";
import getQuery from "../helpers/GetQuery.js";
export class Category extends Model {
  static async create(category) {
    try {
      let query = "EXEC sp_register_products_categories ";
      query += getQuery(category);

      await sequelize.query(query, {
        replacements: category,
        type: sequelize.QueryTypes.RAW,
      });
    } catch (error) {
      throw error;
    }
  }

  static async update(category) {
    try {
      let query = "EXEC sp_update_products_categories ";
      query += getQuery(category);
      await sequelize.query(query, {
        replacements: category,
        type: sequelize.QueryTypes.RAW,
      });
    } catch (error) {
      throw error;
    }
  }

  static async remove(status_id, category_id) {
    try {
      let query =
        "EXEC sp_update_products_categories_status @status_id = :status_id, @products_categories_id = :category_id";
      await sequelize.query(query, {
        replacements: { status_id, category_id },
        type: sequelize.QueryTypes.RAW,
      });
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
      references: {
        model: "status",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "products_categories",
    timestamps: false,
  }
);

Category.belongsTo(Status, {
  foreignKey: "status_id",
  as: "status",
});

Category.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
