const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/database");
var path = require("path");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
//connect db
connectDB();

const PORT = process.env.PORT;
//Setting Up Dynamic port allocation

const app = express();
//Creating express object

app.server = http.createServer(app);
//Create HTTP server

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(morgan("dev"));
//To Get Apache Log Format in Console for Handling Requests

app.use(
  cors({
    exposedHeaders: "*",
  })
);
// To Allow Cross Origin Accessability

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//Setting Attachement Size limit
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.resolve('./public')));

// Setting Routes for APIs

// app.use('/', viewRoutes);
// Setting Routes for Views
app.use("/api/v1/", productRoutes);

// Turn on that server!
app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});
