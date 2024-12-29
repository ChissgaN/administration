import { sequelize } from "../libs/sequelize.js";
import { DataTypes, Model } from "sequelize";
import { Status } from "./StatusModel.js";
import { User } from "./UserModel.js";
import { OrderDetail } from "./OrderDetailModel.js";

export class Order extends Model {
  static async create(order) {
    try {
      let query = "EXEC sp_register_order";

      query += Object.keys(order)
        .map((key) => ` @${key}=:${key}`)
        .join(",");

      const request = await sequelize.query(query, {
        replacements: order,
        type: sequelize.QueryTypes.RAW,
      });

      return request;
    } catch (error) {
      throw error;
    }
  }

  static async update(order) {
    try {
      let query = "EXEC sp_register_order_info";

      query += Object.keys(order)
        .map((key) => ` @${key}=:${key}`)
        .join(",");

      const request = await sequelize.query(query, {
        replacements: order,
        type: sequelize.QueryTypes.RAW,
      });

      return request;
    } catch (error) {
      throw error;
    }
  }
}

Order.init(
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
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "status",
        key: "id",
      },
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_order: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "order",
    timestamps: false,
  }
);

Order.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Order.belongsTo(Status, {
  foreignKey: "status_id",
  as: "status",
});

Order.hasMany(OrderDetail, {
  foreignKey: "order_id",
  as: "order_details",
});
