const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "Usuario creado" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

router.post("/login", async (req, res) => {

    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).json({ message: "Usuario no existe" });
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
  
    if (!validPassword) {
      return res.status(400).json({ message: "Password incorrecto" });
    }
  
    const token = jwt.sign({ id: user._id }, "secret");
  
    res.json({ token });
  
  });