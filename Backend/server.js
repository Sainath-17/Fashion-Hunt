const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* ================== MONGODB CONNECT ================== */
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} 🚀`);
    });
})
.catch(err => console.log(err));

/* ================== SCHEMA ================== */
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    link: String,
    link2: String
});

const Product = mongoose.model("Product", productSchema);

/* ================== ROUTES ================== */

// GET PRODUCTS
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Error fetching products" });
    }
});

// ADD PRODUCT
app.post("/products", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        res.json({ message: "Product added ✅" });
    } catch (err) {
        res.status(500).json({ error: "Error saving product" });
    }
});

// DELETE PRODUCT
app.delete("/products/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted ✅" });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
});

// UPDATE PRODUCT
app.put("/products/:id", async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: "Updated ✅" });
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
});