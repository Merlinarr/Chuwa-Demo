const express = require("express");
const app = express();
const joi = require("joi");
const bodyParser = require("body-parser");
const zip = require("express-easy-zip");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(zip());

app.use("", express.static("./public"));

const expressJWT = require("express-jwt");

const config = require("./config");

const excludedPaths = [/^\/api/];

app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: excludedPaths })
);

const routes = require("./router");
app.use("", routes);

app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof joi.ValidationError)
    return res.status(400).send("Bad Request");
  if (err.name === "UnauthorizedError")
    return res
      .status(403)
      .send("Permission verification failed. Please check and try again.");
  res.status(500).send("server error");
});

app.listen(3008, "127.0.0.1", () => {
  console.log("api server running at http://127.0.0.1:3008");
});
