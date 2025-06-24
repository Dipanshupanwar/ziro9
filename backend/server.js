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
const productRoutes = require("./routes/productRoutes");
const perfumeRoutes = require("./routes/PerfumeRoutes");
const profileRoute = require("./routes/profile");
const cartRoutes = require("./routes/cart");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/payment");


// =========================
// 🛒 DATA & MODELS (Optional Seed)
// =========================
const {
  initialProducts,
  additionalProducts,
  initialProductsR,
  additionalProductsR,
} = require("./data/products");
const { mafiaCollection, summerCollection } = require("./data/perfume");

const {
  InitialProduct,
  AdditionalProduct,
  InitialProductR,
  AdditionalProductR,
} = require("./models/ProductModel");
const {
  perfumeModel,
  summerCollectionModel,
} = require("./models/PerfumeModel");

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
app.use("/api/products", productRoutes);
app.use("/api/perfumes", perfumeRoutes);
app.use("/api/profile", profileRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes);

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
    
    await InitialProduct.deleteMany({});
    await AdditionalProduct.deleteMany({});
    await InitialProductR.deleteMany({});
    await AdditionalProductR.deleteMany({});
    await perfumeModel.deleteMany({});
    await summerCollectionModel.deleteMany({});

    await InitialProduct.insertMany(initialProducts);
    await AdditionalProduct.insertMany(additionalProducts);
    await InitialProductR.insertMany(initialProductsR);
    await AdditionalProductR.insertMany(additionalProductsR);
    await perfumeModel.insertMany(mafiaCollection);
    await summerCollectionModel.insertMany(summerCollection);

    console.log("🌱 Sample data seeded successfully!");
    

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
