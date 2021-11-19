const { Fashion, Furniture, Machinery } = require("../models/product");
const asyncHandler = require("../middleware/async");
const qrcode = require("qrcode");
var path = require("path");

exports.goToHomePage = asyncHandler(async (req, res, next) => {
  console.log("Root page hit!");
  res.sendFile(path.join(__dirname + "/../views/index.html"));
});

exports.renderOtherFiles = asyncHandler(async (req, res, next) => {
  var fileName = req.params["filename"];
  console.log("filename", fileName);
  res.sendFile(path.join(__dirname + "/../views/" + fileName));
});

exports.makeQrCode = asyncHandler(async (req, res, next) => {
  var inputUrl = req.body.url;
  qrcode.toDataURL(inputUrl, function (err, url) {
    res.status(200).json({ result: url });
  });
});

exports.scanQrCode = asyncHandler(async (req, res, next) => {
  var Product;
  //get Product respective of industry with their id
  if (req.params["industry"].localeCompare("Fashion") == 0) {
    Product = await Fashion.findById(req.params["id"]);
  } else if (req.params["industry"].localeCompare("Furniture") == 0) {
    Product = await Furniture.findById(req.params["id"]);
  } else if (req.params["industry"].localeCompare("Machinery") == 0) {
    Product = await Machinery.findById(req.params["id"]);
  }
  var glbUrl = Product.src;
  var usdzUrl = Product.ios_src;
  var source = req.headers["user-agent"];
  ua = useragent.parse(source);
  console.log("Platform : ", ua.platform);
  if (ua.platform == "Android") {
    let redirect_url_android =
      "intent://arvr.google.com/scene-viewer/1.0?file=" +
      glbUrl +
      "&mode=ar_only&resizable=false#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;resizable=false";
    res.redirect(redirect_url_android);
  } else if (
    ua.platform == "iPhone" ||
    ua.platform == "iPad" ||
    ua.platform == "iPod"
  ) {
    let redirect_url_ios = usdzUrl + "#allowsContentScaling=0";
    res.redirect(redirect_url_ios);
  }
});

//To create a model viewer
exports.addProduct = asyncHandler(async (req, res, next) => {
  var Product;
  //add Product respective of industry
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

  //update Product respective of industry
  if (req.params["industry"].localeCompare("Fashion") == 0) {
    Product = await Fashion.findById(req.params["id"]);
  } else if (req.params["industry"].localeCompare("Furniture") == 0) {
    Product = await Furniture.findById(req.params["id"]);
  } else if (req.params["industry"].localeCompare("Machinery") == 0) {
    Product = await Machinery.findById(req.params["id"]);
  }
  console.log(Product);

  (Product.name = req.body.name),
    (Product.description = req.body.description),
    (Product.short_description = req.body.short_description),
    (Product.ios_src = req.body.ios_src),
    (Product.src = req.body.src),
    (Product.category = req.body.category),
    (Product.product_image_url = req.body.product_image_url),
    (Product.price = req.body.price),
    (Product.industry = req.params["industry"]);

  await Product.save()
    .then((data) => {
      res.status(201).send({ result: data });
    })
    .catch((err) => {
      //   logger.error("Something went wrong while creating new model.")
      res.status(500).send({
        result: err.message || "Something went wrong while updating new model.",
      });
    });
});

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const Products = await getAllProductsInIndustry(req.params["industry"]);

  res.status(200).json({
    Products,
  });
});

exports.deleteProductById = asyncHandler(async (req, res, next) => {
  var Products;

  //delete Product respective of industry
  if (req.params["industry"].localeCompare("Fashion") == 0) {
    Products = await Fashion.deleteOne({ _id: req.params["id"] });
  } else if (req.params["industry"].localeCompare("Furniture") == 0) {
    Products = await Furniture.deleteOne({ _id: req.params["id"] });
  } else if (req.params["industry"].localeCompare("Machinery") == 0) {
    Products = await Machinery.deleteOne({ _id: req.params["id"] });
  }

  // Products = await industry.deleteOne({_id:req.params["id"]});

  if (Products != null) {
    res.status(200).json({
      Message: `Product successfully deleted!`,
    });
  } else {
    res.status(400).json({
      Message: "Could not find a product with this id.",
    });
  }
});

exports.getProductById = asyncHandler(async (req, res, next) => {
  var Product;

  //get Product respective of industry with their id
  if (req.params["industry"].localeCompare("Fashion") == 0) {
    Product = await Fashion.findById(req.params["id"]);
  } else if (req.params["industry"].localeCompare("Furniture") == 0) {
    Product = await Furniture.findById(req.params["id"]);
  } else if (req.params["industry"].localeCompare("Machinery") == 0) {
    Product = await Machinery.findById(req.params["id"]);
  }

  res.status(200).json({
    Product,
  });
});

exports.getProductsByCategory = asyncHandler(async (req, res, next) => {
  var Product;

  //get Product of a particular category respective of industry
  if (req.params["industry"].localeCompare("Fashion") == 0) {
    Product = await Fashion.find({ category: req.params["category"] });
  } else if (req.params["industry"].localeCompare("Furniture") == 0) {
    Product = await Furniture.find({ category: req.params["category"] });
  } else if (req.params["industry"].localeCompare("Machinery") == 0) {
    Product = await Machinery.find({ category: req.params["category"] });
  }
  res.status(200).json({
    Product,
  });
});

exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const Products = await getAllProductsInIndustry(req.params["industry"]);

  var allCategories = Products.map(function (obj) {
    return obj.category;
  });

  categories = allCategories.filter(function (elem, pos) {
    return allCategories.indexOf(elem) == pos;
  });

  res.status(200).json({
    categories,
  });
});

function getAllProductsInIndustry(industry) {
  if (industry.localeCompare("Fashion") == 0) {
    Products = Fashion.find();
  } else if (industry.localeCompare("Furniture") == 0) {
    Products = Furniture.find();
  } else if (industry.localeCompare("Machinery") == 0) {
    Products = Machinery.find();
  }
  return Products;
}
