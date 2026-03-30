const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT MONGODB
mongoose.connect("mongodb+srv://Sai:bicsac-zorboq-bAbby0@fashionhunt.eibgczb.mongodb.net/fashionhunt?appName=Fashionhunt")
.then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(3000, () => {
        console.log("Server running on port 3000 🚀");
    });
})
.catch(err => console.log(err));

// SCHEMA
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    link: String,
    link2: String
});

const Product = mongoose.model("Product", productSchema);

// GET
app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// ADD
app.post("/products", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        console.log("Saved to MongoDB ✅");

        res.json({ message: "Product added" });
    } catch (err) {
        res.status(500).json({ error: "Error saving product" });
    }
});

// DELETE
app.delete("/products/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted ✅" });
});

// UPDATE
app.put("/products/:id", async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Updated ✅" });
});

