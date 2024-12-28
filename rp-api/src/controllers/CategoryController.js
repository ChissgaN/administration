import CategoryModel from "../models/CategoryModel.js";
import { storeSchema, updateSchema } from "../libs/joi/CategoriesSchema.js";
import joi from "joi";

export async function index(req, res) {
  try {
    const categories = await CategoryModel.select();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function show(req, res, next) {
  try {
    const category = await CategoryModel.find(req.params.id);
    if (!category) {
      throw { message: "Category not found", status: 404 };
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function store(req, res, next) {
  try {
    const user_id = req.auth.id;
    await storeSchema.validateAsync(req.body);
    await CategoryModel.create({ ...req.body, user_id });
    res.json({ message: "Category created successfully" });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    await updateSchema.validateAsync(req.body);
    await CategoryModel.update({ ...req.body, products_categories_id: req.params.id });
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    const category = await CategoryModel.find(req.params.id);
    if (!category) {
      throw { message: "Category not found", status: 404 };
    }
    await CategoryModel.remove(2, req.params.id);
    res.json({ message: "Category removed successfully" });
  } catch (error) {
    next(error);
  }
}

export default { index, store, update, remove };
