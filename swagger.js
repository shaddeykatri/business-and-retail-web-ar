const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];
const doc = {info: {title: 'Web AR APIs',description: 'These are the APIs for the backend of Demo Web AR Application',},host: 'webarbackend.azurewebsites.net',schemes: ['https'],};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index.js");
});