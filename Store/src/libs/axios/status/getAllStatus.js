import instance from "..";

export const getAllStatus = async () => {
    const { data } = await instance.get("/status");
    return data;
}

export default getAllStatus;