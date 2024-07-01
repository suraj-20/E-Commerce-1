const express = require("express");
const {
  addProduct,
  removeProduct,
  getAllProducts,
  newCollection,
  popularInWomen,
} = require("../controllers/product");
const Product = require("../models/product");
const router = express.Router();

router.post("/addProduct", addProduct);
router.delete("/deleteProduct", removeProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/newCollections", newCollection);
router.get("/popularInWomens", popularInWomen);

module.exports = router;
