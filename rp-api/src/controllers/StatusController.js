import { Status } from "../models/StatusModel.js";
import { storeSchema, updateSchema } from "../libs/joi/StatusSchema.js";

export async function index(req, res, next) {
  try {
    const status = await Status.findAll();
    res.json(status);
  } catch (error) {
    next(error);
  }
}

export async function show(req, res) {
  try {
    const status = await Status.findByPk(req.params.id);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function store(req, res, next) {
  try {
    await storeSchema.validateAsync(req.body);
    await Status.create(req.body);
    res.json({ message: "Status created successfully" });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    await updateSchema.validateAsync(req.body);
    await Status.update({ ...req.body, status_id: req.params.id });
    res.json({ message: "Status updated successfully" });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    const status = await Status.find(req.params.id);
    if (!status) {
      throw { message: "Status not found", status: 404 };
    }
    await Status.remove(1, req.params.id);
    res.json({ message: "Status removed successfully" });
  } catch (error) {
    next(error);
  }
}

export default { index, store, update, remove, show };
