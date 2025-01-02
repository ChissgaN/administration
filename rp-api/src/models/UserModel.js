import { sequelize } from "../libs/sequelize.js";
import { DataTypes, Model } from "sequelize";
import { Status } from "./StatusModel.js";
import { Role } from "./RoleModel.js";
import { Client } from "./ClientModel.js";

export class User extends Model {
  static async create(user) {
    try {
      const request = await pool.request();
      Object.entries(user).forEach(([key, value]) => {
        request.input(key, value);
      });

      await request.execute("sp_register_user");
    } catch (error) {
      throw error;
    }
  }

  static async update(user) {
    try {
      const request = await pool.request();
      Object.entries(user).forEach(([key, value]) => {
        request.input(key, value);
      });

      await request.execute("sp_update_user");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async remove(status_id, user_id) {
    try {
      const request = await pool.request();
      request.input("status_id", status_id);
      request.input("user_id", user_id);

      await request.execute("sp_update_user_status");
    } catch (error) {
      throw error;
    }
  }
}

User.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "role",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);

User.belongsTo(Status, {
  foreignKey: "status_id",
  as: "status",
});

User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});

User.hasOne(Client, {
  foreignKey: "user_id",
  as: "client",
});

Client.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
