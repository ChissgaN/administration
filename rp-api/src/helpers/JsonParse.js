export function jsonParse(data) {
  try {
    const values = data.recordset[0];
    const v_key = Object.keys(values)[0];
    if(!values[v_key]){
      throw {message: "Data not found", status: 404};
    }
    return JSON.parse(values[v_key]);
  } catch (error) {
    throw error;
  }
}

export default jsonParse;
