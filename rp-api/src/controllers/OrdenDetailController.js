import OrdenDetailModel from "../models/OrdenDetailModel.js";
import { storeSchema, updateSchema } from "../libs/joi/OrdenDetailSchema.js";

export async function index(req, res, next){
    try {
        const orden_detail = await OrdenDetailModel.select();
        res.json({ orden_detail });
    } catch (error) {
        next(error);
    }
}

export async function show(req, res, next){
    try {
        const orden_detail = await OrdenDetailModel.find(req.params.id);
        if (!orden_detail) {
            throw { message: "Orden Detail not found", status: 404 };
        }
        res.json(orden_detail);
    } catch (error) {
        next(error);
    }
}

export async function store(req, res, next){
    try {
        await storeSchema.validateAsync(req.body);
        await OrdenDetailModel.create(req.body);
        res.json({ message: "Orden Detail created successfully" });
    } catch (error) {
        next(error);
    }
}

export async function update(req, res, next){
    try{
        await updateSchema.validateAsync(req.body);
        await OrdenDetailModel.update({ ...req.body, orden_detail_id: req.params.id });
        res.json({ message: "Orden Detail updated successfully" });
    } catch (error) {
        next(error);
    }
}

export async function remove(req, res, next){
    try{
        const orden_detail = await OrdenDetailModel.find(req.params.id);
        if (!orden_detail) {
            throw { message: "Orden Detail not found", status: 404 };
        }
        await OrdenDetailModel.remove(1, req.params.id);
        res.json({ message: "Orden Detail removed successfully" });
    } catch (error){
        next(error);
    }
}

export default { index, store, update, remove };