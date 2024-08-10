document.addEventListener("DOMContentLoaded", function() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const productGrid = document.getElementById('product-grid');

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                productCard.innerHTML = `
                    <img src="${product.images[0]}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <div class="rating">
                        <span>${product.rating} &#9733;</span>
                        <span>(${product.reviews} reviews)</span>
                    </div>
                    <a href="product.html?id=${product.id}">View Details</a>
                `;

                productGrid.appendChild(productCard);
            });

            updateCartCount();
        })
        .catch(error => console.error('Error fetching products:', error));
});

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    const cartItemCountElem = document.getElementById('cart-item-count');
    if (cartItemCountElem) {
        cartItemCountElem.textContent = cartItemCount;
    }
}
