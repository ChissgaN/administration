import { pool } from "../libs/db_conn.js";

export async function select(){
    try{
        const query = "SELECT * FROM status";
        console.log(query);
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

export async function find(status_id){
    try{
        const query = "SELECT * FROM status WHERE id = @status_id";
        const request = await pool.request();
        request.input("status_id", status_id);
        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

export async function create(status){
    try{
        const request = await pool.request();
        Object.entries(status).forEach(([key, value]) =>{
            request.input(key, value);
        });
        await request.execute("sp_create_status");
    } catch (error){
        throw error;
    }
}

export async function update(status){
    try{
        const request = await pool.request();
        Object.entries(status).forEach(([key, value]) => {
            request.input(key, value);
        });
        await request.execute("sp_update_status");
    } catch (error) {
        throw error;
    }
}

export async function remove(status_id){
    try{
        const request = await pool.request();
        request.input("status_id", status_id);
        await request.execute("sp_update_status");
    } catch (error) {
        throw error;
    }
}

export default { select, find, create, update, remove };