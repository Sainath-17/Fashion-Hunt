const params = new URLSearchParams(window.location.search);
const productName = params.get("name");

async function loadProducts() {
    const res = await fetch("https://fashion-hunt-backend.onrender.com");
    const products = await res.json();

    const product = products.find(p => p.name === productName);

    // MAIN PRODUCT
    document.getElementById("product-img").src = product.image;
    document.getElementById("product-name").innerText = product.name;
    document.getElementById("product-price").innerText = "₹" + product.price;
    document.getElementById("product-desc").innerText =
        product.description || "Premium fashion product";
    document.getElementById("product-link").href =
        product.link || "#";
    document.getElementById("product-link2").href = product.link2 || "#";

    // 🔥 SHOW ALL OTHER PRODUCTS
    const related = products.filter(p => p.name !== productName);

    document.getElementById("right").innerHTML =
        related.map(p => `
        <div class="card" onclick="openProduct('${p.name}')">
            <img src="${p.image}">
            <p>${p.name}</p>
            <p>₹${p.price}</p>
        </div>
    `).join("");
}

function openProduct(name) {
    window.location.href = `product.html?name=${name}`;
}

loadProducts();

function goHome() {
    window.location.href = "index.html";
}