import "dotenv/config";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { authModel } from "../models/auth.model.js";
import { isValidEmail } from "../utils/validators/email.validate.js";

const login = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const user = await authModel.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const payload = { email, id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({
      email,
      nombre: user.nombre,
      apellido: user.apellido,
      rut: user.rut,
      url: user.url,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const register = async (req, res) => {
  try {
    const { nombre = "", apellido = "", email = "", password = "" } = req.body;

    if (!nombre.trim() || !apellido.trim() || !email.trim() || !password.trim()) {
      return res.status(400).json({
        error: "Nombre, apellido, email y contraseña son requeridos",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    const existingUser = await authModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const newUser = {
      id: nanoid(),
      nombre,
      apellido,
      email,
      password,
      rut: "", // preparado para uso futuro
      url: "", // preparado para uso futuro
    };

    await authModel.addUser(newUser);

    const payload = { email, id: newUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({ email, nombre, apellido, token });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const me = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await authModel.getUserByEmail(email);
    return res.json({
      email,
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      rut: user.rut,
      url: user.url,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const authController = {
  login,
  register,
  me,
};
