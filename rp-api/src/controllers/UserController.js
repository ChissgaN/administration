import { User } from "../models/UserModel.js";
import { storeSchema, updateSchema } from "../libs/joi/UsersSchema.js";
import { hash } from "bcrypt";

export async function index(req, res, next) {
  try {
    const user = await User.findAll({
      where: { status_id: 1 },
      attributes: { exclude: ["password"] },
      include: ["role", "status"],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function show(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: ["role", "status"],
    });
    if (!user || user.status_id === 2) {
      throw { message: "User not found", status: 404 };
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function store(req, res, next) {
  try {
    await storeSchema.validateAsync(req.body);
    const hashedPassword = await hash(req.body.password, 10);
    req.body.password = hashedPassword;
    await User.create(req.body);
    res.json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    await updateSchema.validateAsync(req.body);
    const hashedPassword = await hash(req.body.password, 10);
    req.body.password = hashedPassword;
    await User.update({ ...req.body, user_id: req.params.id });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    const user = await User.find(req.params.id);
    if (!user) {
      throw { message: "User not found", status: 404 };
    }
    await User.remove(2, req.params.id);
    res.json({ message: "User removed successfully" });
  } catch (error) {
    next(error);
  }
}

export default { index, store, update, remove };
