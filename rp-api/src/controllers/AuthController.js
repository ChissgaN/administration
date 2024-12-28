import { findBy } from "../models/AuthModel.js";
import { appConfig } from "../config/app_config.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

export async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await findBy("email", email);

  try {
    if (!user || user["status"]["name"].toLowerCase() === "inactivo") {
      throw { message: "User not found", status: 404 };
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const payload = {
      id: user.id,
      role: user.role,
    };
 
    const token = jwt.sign(payload, appConfig.secret, {
      expiresIn: "24h",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

export default login;
