console.log("Hello there");

const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const productRoute = require("./routes/product.route");
const app = express();

// Middleware config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from NODE API Server");
});

mongoose
  .connect(
    "mongodb+srv://hntrbeeny:yJ4L53n2WWAD8qR0@backend-db.f6ialfo.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backend-db"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
