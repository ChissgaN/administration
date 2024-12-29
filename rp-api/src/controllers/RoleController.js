import { Role } from "../models/RoleModel.js";

export async function index(req, res, next) {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    next(error);
  }
}

export async function show(req, res, next) {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      throw { message: "Role not found", status: 404 };
    }
    res.json(role);
  } catch (error) {
    next(error);
  }
}

export default { index, show };
