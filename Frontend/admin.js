let editId = null;

// LOAD PRODUCTS
async function loadProducts() {
    const res = await fetch("http://localhost:3000/products");
    const products = await res.json();

    document.getElementById("admin-products").innerHTML =
        products.map(p => `
            <div style="
                margin:10px;
                padding:15px;
                border-radius:10px;
                box-shadow:0 5px 15px rgba(0,0,0,0.1);
                display:flex;
                justify-content:space-between;
                align-items:center;
            ">
                <div>
                    <p><b>${p.name}</b></p>
                    <p>₹${p.price}</p>
                </div>

                <div>
                    <button onclick="editProduct('${p._id}')"
                        style="margin-right:10px;">
                        ✏️ Edit
                    </button>

                    <button onclick="deleteProduct('${p._id}')"
                        style="background:red;color:white;border:none;padding:6px 10px;border-radius:5px;">
                        ❌ Delete
                    </button>
                </div>
            </div>
        `).join("");
}

// ADD OR UPDATE PRODUCT
async function addProduct() {

    const product = {
        name: document.getElementById("name").value,
        price: Number(document.getElementById("price").value), // 🔥 important
        image: document.getElementById("image").value,
        description: document.getElementById("description").value,
        link: document.getElementById("link").value,
        link2: document.getElementById("link2").value
    };

    if (editId) {
        await fetch(`http://localhost:3000/products/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });

        alert("Product Updated ✅");
        editId = null;

    } else {
        await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });

        alert("Product Added ✅");
    }

    loadProducts();
}

// EDIT PRODUCT
async function editProduct(id) {
    const res = await fetch("http://localhost:3000/products");
    const products = await res.json();

    const p = products.find(x => x._id === id);

    document.getElementById("name").value = p.name;
    document.getElementById("price").value = p.price;
    document.getElementById("image").value = p.image;
    document.getElementById("description").value = p.description;
    document.getElementById("link").value = p.link;
    document.getElementById("link2").value = p.link2;

    editId = id;
}

// DELETE PRODUCT
async function deleteProduct(id) {
    await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
    });

    loadProducts();
}

// LOAD PAGE
loadProducts();