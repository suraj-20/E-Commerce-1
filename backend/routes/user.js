const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email already Exist" });
    }

    let cart = {};
    for (let i = 0; i < 100; i++) {
      cart[i] = 0;
    }

    const user = await User.create({
      name,
      email,
      password,
      cartData: cart,
    });

    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ error: "Internal server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    // console.log(token);
    return res.json({ success: true, token });
  } catch (error) {
    return res.json({ error: "Incorrect Email or password" });
  }

  // console.log(token);
});

module.exports = router;
