import { Sequelize } from "sequelize";
import { dbConfig } from "../config/db_config.js";

const { database, password, port, server, user } = dbConfig;

export const sequelize = new Sequelize(database, user, password, {
  host: server,
  dialect: "mssql",
  port: port,
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
  logging: false,
});

