const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const connectDB = async () => {
  await mongoose
    .connect(process.env.COSMOS_URL, {
      auth: {
        username: process.env.COSMOSDB_USER,
        password: process.env.COSMOSDB_PASSWORD,
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    })
    .then(() => console.log("Connection to CosmosDB successful"))
    .catch((err) => console.error(err));
};

module.exports = connectDB;
