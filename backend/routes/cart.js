const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/addToCart", async (req, res) => {
  console.log(req.body, req.user);

  const userData = await User.findOne({ _id: req.user._id });
  userData.cartData[req.body.itemId] += 1;
  const result = await User.findOneAndUpdate(
    { _id: req.user._id },
    { cartData: userData.cartData }
  );

  res.json({ success: 1, result });
});

router.post("/removeFromCart", async (req, res) => {
//   console.log(req.body, req.user);

  const userData = await User.findOne({ _id: req.user._id });
  userData.cartData[req.body.itemId] -= 1;
  const result = await User.findOneAndUpdate(
    { _id: req.user._id },
    { cartData: userData.cartData }
  );

  res.json({ success: 1, result });
});

router.post("/getCartItems", async (req, res) => {
//   console.log("Get Cart Items");
  const userData = await User.findOne({ _id: req.user._id });
  res.json(userData.cartData);
});

module.exports = router;
