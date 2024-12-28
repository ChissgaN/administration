import sql from 'mssql';
import { dbConfig } from "../config/db_config.js";
 

const config =
{
  ...dbConfig,
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
  },
  
}

export const pool = sql.connect(
  config,
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Database connected");

  }
);
