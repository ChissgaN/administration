import { findBy } from "../models/AuthModel.js";
import { User } from "../models/UserModel.js";
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

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
}

export async function profile(req, res, next) {
  try {
    const { auth } = req;
    const mods = {
      attributes: { exclude: ["password"] },
      include: ["role", "status"],
    };

    auth.role.id !== 1 && mods.include.push("client");
    const user = await User.findByPk(auth.id, mods);

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

export async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
}

export default login;
