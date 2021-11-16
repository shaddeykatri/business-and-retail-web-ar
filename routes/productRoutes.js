const express = require("express");
const {
  addProduct,
  updateProduct,
  getAllProducts,
  deleteProductById,
  getProductById,
  getProductsByCategory,
} = require("../controller/productController");

const router = express.Router();

router.get("/:industry/getAll", getAllProducts);
router.get('/:industry/:id',  getProductById);
router.get('/:industry/:category/getAll',  getProductsByCategory);
router.get('/:industry/getAllCategories',  getAllCategories);

router.post("/:industry/addProduct", addProduct);
router.put("/:industry/updateProduct/:id", updateProduct);
router.delete('/:industry/deleteProduct/:id', deleteProductById);

module.exports = router;
