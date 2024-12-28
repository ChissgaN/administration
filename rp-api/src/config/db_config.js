import { config } from "dotenv";

config();

export const dbConfig = {
  server: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
};

export default dbConfig;
