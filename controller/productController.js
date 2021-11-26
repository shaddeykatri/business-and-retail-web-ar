const { Fashion, Furniture, Machinery, Food } = require("../models/product");
const asyncHandler = require("../middleware/async");
const qrcode = require("qrcode");
const useragent = require("express-useragent");
var path = require("path");

// exports.goToHomePage = asyncHandler(async (req, res, next) => {
//   console.log("Root page hit!");
//   if(req.query.category !== undefined && req.query.category !== null && req.query.category.length !== 0){
//     console.log("cat",req.query.category)
//     res.render(path.join(__dirname + "/../views/index.html"), {category : req.query.category});
//   }
//   else{
//     console.log("inside else")
//     res.render(path.join(__dirname + "/../views/index.html"),{category: ""});
//   }

// });

// exports.renderOtherFiles = asyncHandler(async (req, res, next) => {
//   var fileName = req.params["filename"];
//   console.log("filename", fileName);
//   console.log(req.query.id);
//   if(req.query.id !== undefined && req.query.id !== null && req.query.industry !== undefined && req.query.industry !== null) {
//     if(req.query.id.length === 24 && req.query.industry.length !== 0 && (req.query.industry.localeCompare('Furniture') === 0 || req.query.industry.localeCompare('Fashion') === 0 || req.query.industry.localeCompare('Machinery') === 0)) {
//       res.render(path.join(__dirname + '/../views/' + fileName), { id: req.query.id, industry: req.query.industry});
//     }
//   }
//   else {
//     if(req.query.category !== undefined && req.query.category !== null && req.query.category.length !== 0){
//       res.render(path.join(__dirname + "/../views/" + fileName),{category: req.query.category});
//     }else{
//       res.render(path.join(__dirname + "/../views/" + fileName),{category: ""});
//     }

//   }
// });

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
  } else if (req.params["industry"].localeCompare("Food") == 0) {
    Product = new Food({
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
  } else if (req.params["industry"].localeCompare("Food") == 0) {
    Product = await Food.findById(req.params["id"]);
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
  } else if (req.params["industry"].localeCompare("Food") == 0) {
    Products = await Food.deleteOne({ _id: req.params["id"] });
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
  } else if (req.params["industry"].localeCompare("Food") == 0) {
    Product = await Food.findById(req.params["id"]);
  }

  res.status(200).json({
    Product,
  });
});

exports.getProductsByCategory = asyncHandler(async (req, res, next) => {
  var Products;

  //get Product of a particular category respective of industry
  if (req.params["industry"].localeCompare("Fashion") == 0) {
    Products = await Fashion.find({ category: req.params["category"] });
  } else if (req.params["industry"].localeCompare("Furniture") == 0) {
    Products = await Furniture.find({ category: req.params["category"] });
  } else if (req.params["industry"].localeCompare("Machinery") == 0) {
    Products = await Machinery.find({ category: req.params["category"] });
  } else if (req.params["industry"].localeCompare("Food") == 0) {
    Products = await Food.find({ category: req.params["category"] });
  }
  res.status(200).json({
    Products,
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
  } else if (industry.localeCompare("Food") == 0) {
    Products = Food.find();
  }
  return Products;
}

exports.postAllModels = asyncHandler(async (req, res, next) => {
  var data = {}
  // console.log(data.Sheet1.length);
  for (var i = 0; i < data.Sheet1.length; i++) {
    var Product = new Food({
      name: data.Sheet1[i].name,
      description: data.Sheet1[i].description,
      short_description: data.Sheet1[i].short_description,
      ios_src: data.Sheet1[i].ios_src,
      src: data.Sheet1[i].src,
      category: data.Sheet1[i].category,
      product_image_url: data.Sheet1[i].product_image_url,
      price: data.Sheet1[i].price,
      industry: data.Sheet1[i].industry,
    });
    await Product.save()
      .then((data) => {
        console.log(i);
      })
      .catch((err) => {
        console.log("error");
      });
  }
  res.status(200).send("Done!!");
});
