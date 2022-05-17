import User from "../models/user_model.js";
import bcrypt from "bcrypt";

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

const login = async (req, res) => {
  try {
    const user = req.body;
    User.findOne(user.name, (err, result) => {
      bcrypt.compare(user.password, result.password, (err, same) => {
        if (!same) {
          res.json({ message: "Gagal login" });
        }
        res.json({ message: "Berhasil Login" });
      });
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export { register, login };
