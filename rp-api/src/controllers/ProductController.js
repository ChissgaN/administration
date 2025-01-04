import { Product } from "../models/ProductModel.js";
import { storeSchema, updateSchema } from "../libs/joi/ProductsSchema.js";
import { unlinkFile } from "../helpers/UnlinkFile.js";
import joi from "joi";
import { Status } from "../models/StatusModel.js";

export async function index(req, res, next) {
  try {
    const products = await Product.findAll({
      where: { status_id: 1 },
      include: ["category","status"],
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function show(req, res, next) {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: ["category","status"],
    });

    if (!product || product.status_id === 2) {
      throw { message: "Product not found", status: 404 };
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function store(req, res, next) {
  try {
    const user_id = req.auth.id;
    const photo = req?.file?.path;
    console.log(req.file);
    await storeSchema.validateAsync(req.body);
    await Product.create({ ...req.body, user_id, photo, status_id: 1 });
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    unlinkFile(req?.file?.path);
    next(error);
  }
}

export async function update(req, res, next) {
  let product = null;
  try {
    product = await ProductsModel.find(req.params.id);
    if (!product) {
      throw { message: "Product not found", status: 404 };
    }

    const { products_categories_id, name, brand, code } = req.body;

    const data = {
      products_categories_id:
        products_categories_id || product.products_categories_id,
      name: name || product.name,
      brand: brand || product.brand,
      code: code || product.code,
      photo: req?.file?.path || product.photo,
      product_id: req.params.id,
    };

    await updateSchema.validateAsync(req.body);
    await ProductsModel.update(data);

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    unlinkFile(req?.file?.path);
    next(error);
  } finally {
    if (req?.file?.path && product?.photo) {
      console.log(req.file.path, product.photo);
      unlinkFile(product?.photo);
    }
  }
}

export async function remove(req, res, next) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      throw { message: "Product not found", status: 404 };
    }
    await Product.remove(2, req.params.id);
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    next(error);
  }
}

export default { index, show, store, update, remove };
