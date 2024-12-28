import { pool } from "../libs/db_conn.js";

export async function select(){
    try{
        const query = "SELECT * FROM clients";
        console.log(query);
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

export async function find(client_id){
    try{
        const query = "SELECT * FROM clients WHERE id = @client_id";
        const request = await pool.request();
        request.input("client_id", client_id);
        const result = await request.query(query);
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
}

export async function create(client){
    try{
        const request = await pool.request();
        Object.entries(client).forEach(([key, value]) => {
            request.input(key, value);
        });
        await request.execute("sp_create_client");
    } catch (error) {
        throw error;
    }
}

export async function update(client){
    try{
        const request = await pool.request();
        Object.entries(client).forEach(([key, value]) => {
            request.input(key, value);
        });
        await request.execute("sp_update_client");
    } catch (error) {
        throw error;
    }
}

export async function remove(status_id, client_id){
    try{
        const request = await pool.request();
        request.input("status_id", status_id);
        request.input("client_id", client_id);
        await request.execute("sp_update_client_status");
    } catch (error) {
        throw error;
    }
}

export default { select, find, create, update, remove };