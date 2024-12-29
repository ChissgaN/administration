import { config } from "dotenv";

config();

export const appConfig = {
  port: process.env.APP_PORT,
  secret: process.env.APP_KEY,
  url: process.env.APP_URL,
  env: process.env.APP_ENV,
  host: process.env.APP_HOST,
  name: process.env.APP_NAME,
  cors: process.env.APP_CORS_ORIGINS,
};

export default appConfig;
