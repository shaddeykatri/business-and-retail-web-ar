const express = require("express");
const {
  addProduct,
  updateProduct,
  getAllProducts,
  deleteProductById,
  getProductById,
  getProductsByCategory,
  getAllCategories,
  goToHomePage,
  renderOtherFiles,
  makeQrCode,
  scanQrCode
} = require("../controller/productController");

const router = express.Router();

router.get("/:filename", renderOtherFiles)
router.get("/", goToHomePage);

router.get("/:industry/getAll", getAllProducts);
router.get("/:industry/getAllCategories", getAllCategories);
router.get("/:industry/:id", getProductById);
router.get("/:industry/:category/getAll", getProductsByCategory);
router.post("/makeQrCode", makeQrCode);
router.get("/scanQrCode/:industry/:id", scanQrCode);
router.post("/:industry/addProduct", addProduct);
router.put("/:industry/updateProduct/:id", updateProduct);
router.delete("/:industry/deleteProduct/:id", deleteProductById);

module.exports = router;
