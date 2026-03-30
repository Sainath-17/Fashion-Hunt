let products = [];
let index = 0;

async function loadProducts() {
    const res = await fetch("https://fashion-hunt-backend.onrender.com");
    products = await res.json();
    updateUI();
}

function updateUI() {
    if (products.length === 0) return;

    const left = products[(index - 1 + products.length) % products.length];
    const center = products[index];
    const right = products[(index + 1) % products.length];

    document.getElementById("center").innerHTML = `
    <div onclick="openProduct('${center.name}','${center.price}','${center.image}')">
        <div class="img-box">
            <img src="${center.image}">
        </div>
        <h2>${center.name}</h2>
        <p>₹${center.price}</p>
    </div>
`;

    document.getElementById("left").innerHTML = `
        <img src="${left.image}">
        <p>${left.name}</p>
    `;

    document.getElementById("right").innerHTML = `
        <img src="${right.image}">
        <p>${right.name}</p>
    `;
}

function next() {
    index = (index + 1) % products.length;
    updateUI();
}

function prev() {
    index = (index - 1 + products.length) % products.length;
    updateUI();
}

loadProducts();
function openProduct(name, price, image) {
    window.location.href = `product.html?name=${name}&price=${price}&image=${image}`;
}