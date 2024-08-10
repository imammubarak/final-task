document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const product = data.products.find(p => p.id == productId);

            if (product) {
                const productDetails = document.getElementById('product-details');

                productDetails.innerHTML = `
                    <div class="product-gallery">
                        ${product.images.map(img => `<img src="${img}" alt="${product.name}">`).join('')}
                    </div>
                    <h1>${product.name}</h1>
                    <p>${product.description}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <div class="rating">
                        <span>${product.rating} &#9733;</span>
                        <span>(${product.reviews} reviews)</span>
                    </div>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
            }
        })
        .catch(error => console.error('Error fetching product details:', error));
});

function addToCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const product = { id: productId, quantity: 1 }; // Example data; extend as needed
        cartItems.push(product);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount(); // Update cart count in the header
    alert(`Product ${productId} added to cart!`);
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    const cartItemCountElem = document.getElementById('cart-item-count');
    cartItemCountElem.textContent = cartItemCount;
}
