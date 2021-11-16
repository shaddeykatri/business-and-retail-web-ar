const { Fashion, Furniture, Machinery } = require("../models/product");
const asyncHandler = require("../middleware/async");

//To create a model viewer
exports.addProduct = asyncHandler(async (req, res, next) => {
  var Product;
  if (req.params["industry"].localeCompare("Fashion") == 0) {
    Product = new Fashion({
      name: req.body.name,
      description: req.body.description,
      short_description: req.body.short_description,
      ios_src: req.body.ios_src,
      src: req.body.src,
      category: req.body.category,
      product_image_url: req.body.product_image_url,
      price: req.body.price,
      industry: req.params["industry"],
    });
  } else if (req.params["industry"].localeCompare("Furniture") == 0) {
    Product = new Furniture({
      name: req.body.name,
      description: req.body.description,
      short_description: req.body.short_description,
      ios_src: req.body.ios_src,
      src: req.body.src,
      category: req.body.category,
      product_image_url: req.body.product_image_url,
      price: req.body.price,
      industry: req.params["industry"],
    });
  } else if (req.params["industry"].localeCompare("Machinery") == 0) {
    Product = new Machinery({
      name: req.body.name,
      description: req.body.description,
      short_description: req.body.short_description,
      ios_src: req.body.ios_src,
      src: req.body.src,
      category: req.body.category,
      product_image_url: req.body.product_image_url,
      price: req.body.price,
      industry: req.params["industry"],
    });
  }
  await Product.save()
    .then((data) => {
      res.status(201).send({ result: data });
    })
    .catch((err) => {
      //   logger.error("Something went wrong while creating new model.")
      res.status(500).send({
        result: err.message || "Something went wrong while creating new model.",
      });
    });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  var Product;

  if (req.params["industry"].localeCompare("Fashion") == 0) {
    Product = await Fashion.findById(req.params["id"]);
  } else if (req.params["industry"].localeCompare("Furniture") == 0) {
    Product = await Furniture.findById(req.params["id"]);
  } else if (req.params["industry"].localeCompare("Machinery") == 0) {
    Product = await Machinery.findById(req.params["id"]);
  }
  console.log(Product)

    Product.name = req.body.name,
    Product.description = req.body.description,
    Product.short_description = req.body.short_description,
    Product.ios_src = req.body.ios_src,
    Product.src = req.body.src,
    Product.category = req.body.category,
    Product.product_image_url = req.body.product_image_url,
    Product.price = req.body.price,
    Product.industry = req.params["industry"]

    await Product.save()
      .then((data) => {
        res.status(201).send({ result: data });
      })
      .catch((err) => {
        //   logger.error("Something went wrong while creating new model.")
        res.status(500).send({
          result:
            err.message || "Something went wrong while updating new model.",
        });
      });
});

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  var Products;

  if (req.params["industry"].localeCompare("Fashion") == 0) {
    Products = await Fashion.find();
  } else if (req.params["industry"].localeCompare("Furniture") == 0) {
    Products = await Furniture.find();
  } else if (req.params["industry"].localeCompare("Machinery") == 0) {
    Products = await Machinery.find();
  }
  res.status(200).json({
    Products
  });
});

exports.deleteProductById = asyncHandler(async (req, res, next) => {
    var Products;
    // var industry = req.params["industry"]
    if (req.params["industry"].localeCompare("Fashion") == 0) {
      Products = await Fashion.deleteOne({_id:req.params["id"]});
    } else if (req.params["industry"].localeCompare("Furniture") == 0) {
      Products = await Furniture.deleteOne({_id:req.params["id"]});
    } else if (req.params["industry"].localeCompare("Machinery") == 0) {
      Products = await Machinery.deleteOne({_id:req.params["id"]});
    }

    // Products = await industry.deleteOne({_id:req.params["id"]});

    if(Products != null){
        res.status(200).json({
          Message: `Product successfully deleted!`,
        });
      }
      else{
          res.status(400).json({
              Message: "Could not find a product with this id."
          })
      }
});


exports.getProductById = asyncHandler(async (req, res, next) => {
    var Product;

    if (req.params["industry"].localeCompare("Fashion") == 0) {
      Product = await Fashion.findById(req.params["id"]);
    } else if (req.params["industry"].localeCompare("Furniture") == 0) {
      Product = await Furniture.findById(req.params["id"]);
    } else if (req.params["industry"].localeCompare("Machinery") == 0) {
      Product = await Machinery.findById(req.params["id"]);
    }

    res.status(200).json({
        Product
      });

});

exports.getProductsByCategory = asyncHandler(async (req, res, next) => {
    var Product;

    if (req.params["industry"].localeCompare("Fashion") == 0) {
      Product = await Fashion.find({category: req.params["category"]});
    } else if (req.params["industry"].localeCompare("Furniture") == 0) {
      Product = await Furniture.find({category: req.params["category"]});
    } else if (req.params["industry"].localeCompare("Machinery") == 0) {
      Product = await Machinery.find({category: req.params["category"]});
    }
    res.status(200).json({
        Product
      });
});

exports.getAllCategories = asyncHandler(async (req, res, next) => {
    
});
