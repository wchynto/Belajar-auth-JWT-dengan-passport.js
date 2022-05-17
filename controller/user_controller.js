import User from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decode } from "jsonwebtoken";

const jwt_key = "secret";

//register controller
const register = async (req, res) => {
  const user = new User(req.body);
  user.password = await bcrypt.hash(user.password, 10);
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//login controller
const login = async (req, res) => {
  try {
    const user = req.body;
    User.findOne(user.name, (err, result) => {
      if (!result) {
        res.json({ message: "User tidak ditemukan" });
      } else {
        bcrypt.compare(user.password, result.password, (err, same) => {
          if (!same) {
            res.json({ message: "Username atau password salah" });
          } else {
            const token = jwt.sign({ username: result.username }, jwt_key, {
              algorithm: "HS256",
              expiresIn: "1h",
            });
            res.json({ message: "Berhasil login", token: token });
          }
        });
      }
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//vrify user token
const verify = async (req, res, next) => {
  try {
    const token = req.body.token;
    jwt.verify(token, jwt_key, (err, decoded) => {
      if (!decoded) {
        res.json({ message: "Anda tidak mendapat ijin" });
      }
      res.json({ message: "Anda mendapat ijin", data: decoded });
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export { register, login, verify };
