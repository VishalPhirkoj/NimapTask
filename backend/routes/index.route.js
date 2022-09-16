const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");

router.get("/", (req, res) => {
  res.send("Namsthe World!!!");
});

router.post("/addCategory", controller.addCategory);
router.get("/getCategories", controller.categoryList);
router.post("/addProduct", controller.addProduct);
router.get("/getProducts", controller.productList);
router.get("/getProduct/:id", controller.getProduct);
router.put("/updateProduct", controller.updateProduct);
router.post("/deleteProduct", controller.deleteProduct);

module.exports = router;
