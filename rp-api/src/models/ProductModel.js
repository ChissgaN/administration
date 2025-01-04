import { sequelize } from "../libs/sequelize.js";
import { DataTypes, Model } from "sequelize";
import { Status } from "./StatusModel.js";
import { Category } from "./CategoryModel.js";
import GetQuery from "../helpers/GetQuery.js";
export class Product extends Model {
  static async create(product) {
    try {
      let query = "EXEC sp_register_products";

      query += GetQuery(product);

      const request = await sequelize.query(query, {
        replacements: product,
        type: sequelize.QueryTypes.RAW,
      });
    } catch (error) {
      throw error;
    }
  }

  static async update(product) {
    try {
      let query = "EXEC sp_update_products";

      query += GetQuery(product);
      sequelize.query(query, {
        replacements: product,
        type: sequelize.QueryTypes.RAW,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async remove(status_id, product_id) {
    try {
      let query =
        "EXEC sp_update_product_status @status_id=:status_id, @product_id=:product_id";
      sequelize.query(query, {
        replacements: { status_id, product_id },
        type: sequelize.QueryTypes.RAW,
      });
    } catch (error) {
      throw error;
    }
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    products_categories_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products_categories",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      references: {
        model: "status",
        key: "id",
      },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: false,
  }
);

Product.belongsTo(Status, {
  foreignKey: "status_id",
  as: "status",
});

Product.belongsTo(Category, {
  foreignKey: "products_categories_id",
  as: "category",
});
