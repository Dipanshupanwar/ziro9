const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cartRoutes = require("./routes/cart");
const contactRoutes = require("./routes/contactRoutes");






const app = express();
const PORT = process.env.PORT || 5000;

const {
  InitialProduct,
  AdditionalProduct,
  InitialProductR,
  AdditionalProductR,
} = require("./models/ProductModel");


const productRoutes = require("./routes/productRoutes");
const perfumeRoutes = require("./routes/PerfumeRoutes")
const profileRoute = require('./routes/profile');

const {
  initialProducts,
  additionalProducts,
  initialProductsR,
  additionalProductsR,
} = require("./data/products");
const { mafiaCollection, summerCollection } = require("./data/perfume");
const { perfumeModel, summerCollectionModel } = require("./models/PerfumeModel");

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));


// API routes
    app.use("/api/products", productRoutes);
    app.use("/api/perfumes",perfumeRoutes);
    app.use('/api/profile', profileRoute);
    app.use("/api/cart", cartRoutes);
    app.use("/api/contact", contactRoutes);


// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Optional: Seed data once
    // await InitialProduct.deleteMany({});
    // await AdditionalProduct.deleteMany({});
    // await InitialProductR.deleteMany({});
    // await AdditionalProductR.deleteMany({});
    // await perfumeModel.deleteMany({});
    // await summerCollectionModel.deleteMany({});
    

    // await InitialProduct.insertMany(initialProducts);
    // await AdditionalProduct.insertMany(additionalProducts);
    // await InitialProductR.insertMany(initialProductsR);
    // await AdditionalProductR.insertMany(additionalProductsR);
    // await perfumeModel.insertMany(mafiaCollection);
    // await summerCollectionModel.insertMany(summerCollection);

    console.log("Data seeded successfully!");



    // ✅ Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
