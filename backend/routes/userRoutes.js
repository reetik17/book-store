const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

// signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new userModel({ username, email, password });
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, "jwt_secret_key", {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
