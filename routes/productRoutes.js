const express = require('express');
const { addProduct } = require('../controller/productController');


const router = express.Router();



// router.get('/getAll',  getAllProducts);

// router.get('/:industry/getAll',  getAssetById);
// router.get('/:industry/:id',  getAssetById);
// router.get('/:industry/:category/getAll',  getAssetById);
// router.get('/:industry/getAllCategories',  getAssetById);

router.post('/:industry/addProduct',  addProduct);
// router.put('/:industry/updateProduct/:id', putAssetById);
// router.delete('/:industry/deleteProduct/:id', deleteExternalAsset);

module.exports = router;