import { pool } from "../libs/db_conn.js";

export async function select() {
  try {
    const query = "SELECT * FROM orden_details";
    console.log(query);
    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    throw error;
  }
}

export async function find(orden_detail_id) {
  try {
    const query = `SELECT * FROM orden_details WHERE id = @orden_detail_id`;
    const request = await pool.request();
    request.input("orden_detail_id", orden_detail_id);
    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

export async function create(orden_detail) {
  try {
    const request = await pool.request();
    Object.entries(orden_detail).forEach(([key, value]) => {
      request.input(key, value);
    });

    await request.execute("sp_register_orden_details");
  } catch (error) {
    throw error;
  }
}

export async function update(orden_detail) {
  try {
    const request = await pool.request();
    Object.entries(orden_detail).forEach(([key, value]) => {
      request.input(key, value);
    });

    await request.execute("sp_update_orden_details");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function remove(status_id, orden_detail_id) {
  try {
    const request = await pool.request();
    request.input("status_id", status_id);
    request.input("orden_detail_id", orden_detail_id);

    await request.execute("sp_update_orden_detail_status");
  } catch (error) {
    throw error;
  }
}

export default { select, find, create, update, remove };