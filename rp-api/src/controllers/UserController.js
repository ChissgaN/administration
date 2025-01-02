import { User } from "../models/UserModel.js";
import { storeSchema, updateSchema } from "../libs/joi/UsersSchema.js";
import { hash } from "bcrypt";

export async function index(req, res, next) {
  try {
    const mods = {
      attributes: { exclude: ["password"] },
      include: ["role", "status"],
      where: { status_id: 1 },
    };
    const { query } = req;
    query.role_id && (mods.where = { ...mods.where, role_id: query.role_id });
    const user = await User.findAll(mods);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function show(req, res, next) {
  try {
    const {auth} = req;
    const mods = {
      attributes: { exclude: ["password"] },
      include: ["role", "status"],
    };
    auth.role.id !== 1 && (mods.include.push("client"));
    console.log(mods);
    const user = await User.findByPk(req.params.id, mods);
    if (!user || user.status_id === 2) {
      throw { message: "User not found", status: 404 };
    }

    if (auth.role_id !== 1 && auth.user_id !== user.user_id) {
      throw { message: "Unauthorized", status: 403 };
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
    const {auth} = req;
    if(auth.user_id !== req.params.id) {
      throw { message: "Unauthorized", status: 403 };
    }
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
