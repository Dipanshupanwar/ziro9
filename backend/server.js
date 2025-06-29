// =========================
// 🌐 IMPORTS
// =========================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// =========================
// 📦 ROUTE IMPORTS
// =========================

const profileRoute = require("./routes/profile");
const cartRoutes = require("./routes/cartRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/payment");
const Product = require("./models/ProductsModel");
const pro = require ("./routes/productRoutes.js")




// =========================
// 🛒 DATA & MODELS (Optional Seed)
// =========================
const { products } = require("./data/products.js");
const Cart = require("./models/Cart");



// =========================
// 🚀 INIT EXPRESS
// =========================
const app = express();
const PORT = process.env.PORT || 5000;

// =========================
// 🧩 MIDDLEWARES
// =========================
app.use(cors());
app.use(express.json());

// =========================
// 🔗 ROUTES
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/products", pro );



// =========================
// 🌍 CONNECT TO MONGODB
// =========================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // =========================
    // 📦 OPTIONAL: SEED DATA
    // =========================
  // try {
  //   await Product.deleteMany();
  //   await Product.insertMany(products);
  //   console.log("✅ Data seeded successfully");
  // } catch (err) {
  //   console.error("❌ Seeding failed:", err);
  // }

    
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

    // console.log("🌱 Sample data seeded successfully!");
    

    // =========================
    // 🚀 START SERVER
    // =========================
    app.listen(PORT, () => {
      console.log(`⚡ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
