import { pool } from "../libs/db_conn.js";
import {jsonParse} from "../helpers/JsonParse.js"

export async function select(){
    try{
        const query = "SELECT * From vw_categories WHERE status_id = 1 FOR JSON PATH";
        const result = await pool.request().query(query);
        return jsonParse(result);
    } catch (error) {
        throw error;
    }
}

export async function find(category_id){
    try{
        const query = "SELECT * FROM vw_categories WHERE id = @category_id AND status_id = 1 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER";
        const request = await pool.request();
        request.input("category_id", category_id);
        const result = await request.query(query);
        console.log(result.recordset);
        return jsonParse(result);

    } catch (error) {
        throw error;
    }
}

export async function create(category){
    try{
        const request = await pool.request();
        Object.entries(category).forEach(([key, value]) => {
            request.input(key, value);
        });
        await request.execute("sp_register_products_categories");
    } catch (err) {
        throw err;
    }
}

export async function update(category){
    try{
        const request = await pool.request();
        Object.entries(category).forEach(([key, value]) => {
            request.input(key, value);
        });
        await request.execute("sp_update_products_categories");
    } catch (error) {
        throw error;
    }
}

export async function remove(status_id, category_id){
    try{
        const request = await pool.request();
        request.input("status_id", status_id);
        request.input("products_categories_id", category_id);
        await request.execute("sp_update_products_categories_status");
    } catch (error) {
        throw error;
    }
}

export default { select, find, create, update, remove };