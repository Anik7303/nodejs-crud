const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: path.join(__dirname, "..", ".env"),
  });
}
const express = require("express");
const mongoose = require("mongoose");

// register database models
require("./models");

// middlewares
const { error, error404 } = require("./middlewares");

// routes
const { userRouter } = require("./routes");

// variables
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/test";
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", userRouter);

app.use(error);
app.use(error404);

mongoose
  .connect(DB_URI, dbOptions)
  .then((_conn) => console.log("Connected to Mongo Database"))
  .catch((err) => console.error(err));

app.listen(PORT, HOST, () => {
  console.log(`server address: http://${HOST}:${PORT}`);
});
