import { sequelize } from "../libs/sequelize.js";
import { DataTypes, Model } from "sequelize";
import { Status } from "./StatusModel.js";
import { Category } from "./CategoryModel.js";
export class Product extends Model {
  static async create(product) {
    try {
      const request = await pool.request();
      Object.entries(product).forEach(([key, value]) => {
        request.input(key, value);
      });

      await request.execute("sp_register_products");
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

      await request.execute("sp_update_products");
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
