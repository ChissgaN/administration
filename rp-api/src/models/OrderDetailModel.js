import { sequelize } from "../libs/sequelize.js";
import { DataTypes, Model } from "sequelize";
import { Order } from "./OrderModel.js";
import { Product } from "./ProductModel.js";

export class OrderDetail extends Model {}

OrderDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "order",
        key: "id",
      },
    },
    products_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "product",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order_details",
    timestamps: false,
  }
);

OrderDetail.belongsTo(Product, {
  foreignKey: "products_id",
  as: "product",
});
