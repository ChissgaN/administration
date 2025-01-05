import { sequelize } from "../libs/sequelize.js";
import { DataTypes, Model } from "sequelize";
import { Status } from "./StatusModel.js";
import { Role } from "./RoleModel.js";
import { Client } from "./ClientModel.js";
import getQuery from "../helpers/GetQuery.js";
export class User extends Model {
  static async create(user) {
    try {
      let query = "EXEC sp_register_user ";
      query += getQuery(user);
      await sequelize.query(query, {
        replacements: user,
        type: sequelize.QueryTypes.RAW,
      });
    } catch (error) {
      throw error;
    }
  }

  static async update(user) {
    try {
      let query = "EXEC sp_update_user ";
      query += getQuery(user);
      await sequelize.query(query, {
        replacements: user,
        type: sequelize.QueryTypes.RAW,
      });
    } catch (error) {
      throw error;
    }
  }

  static async remove(status_id, user_id) {
    try {
      let query =
        "EXEC sp_update_user_status  @status_id = :status_id, @user_id = :user_id";

      await sequelize.query(query, {
        replacements: { status_id, user_id },
        type: sequelize.QueryTypes.RAW,
      });
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
