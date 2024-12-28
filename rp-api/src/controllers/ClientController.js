import ClientModel from "../models/ClientModel.js";
import { storeSchema, updateSchema } from "../libs/joi/ClientsSchema.js";
export async function index(req, res, next) {
  try {
    const client = await ClientModel.select();
    res.json(client);
  } catch (error) {
    next(error);
  }
}

export async function show(req, res, next) {
  try {
    const client = await ClientModel.find(req.params.id);
    if (!client) {
      throw { message: "Client not found", status: 404 };
    }
    res.json(client);
  } catch (error) {
    next(error);
  }
}

export async function store(req, res, next) {
  try {
    await storeSchema.validateAsync(req.body);
    await ClientModel.create(req.body);
    res.json({ message: "Client created successfully" });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    await updateSchema.validateAsync(req.body);
    await ClientModel.update({ ...req.body, client_id: req.params.id });
    res.json({ message: "Client updated successfully" });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    const client = await ClientModel.find(req.params.id);
    if (!client) {
      throw { message: "Client not found", status: 404 };
    }
    await ClientModel.remove(1, req.params.id);
    res.json({ message: "Client removed successfully" });
  } catch (error) {
    next(error);
  }
}

export default { index, store, update, remove };
