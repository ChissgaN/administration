import { pool } from "../libs/db_conn.js";
import { jsonParse } from "../helpers/JsonParse.js";

export async function select() {
  try {
    const query = "SELECT * FROM vw_products WHERE status_id = 1 for json path";
    const result = await pool.request().query(query);

    return jsonParse(result);
  } catch (error) {
    throw error;
  }
}

export async function find(product_id) {
  try {
    const query = `SELECT * FROM vw_products WHERE id = @product_id AND status_id = 1 for json path, without_array_wrapper`;

    const request = await pool.request();
    request.input("product_id", product_id);
    const result = await request.query(query);
    return jsonParse(result);
  } catch (error) {
    throw error;
  }
}

export async function create(product) {
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

export async function update(product) {
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

export async function remove(status_id, product_id) {
  try {
    const request = await pool.request();
    request.input("status_id", status_id);
    request.input("product_id", product_id);

    await request.execute("sp_update_product_status");
  } catch (error) {
    throw error;
  }
}

export default { select, find, create, update, remove };
