document.addEventListener("DOMContentLoaded", function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElem = document.getElementById('subtotal');
    const totalElem = document.getElementById('total');

    let subtotal = 0;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        subtotalElem.textContent = 'Subtotal: $0.00';
        totalElem.textContent = 'Total: $0.00';
        return;
    }

    cartItems.forEach(item => {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                const product = data.products.find(p => p.id === item.id);

                if (product) {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${product.images[0]}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>$${product.price.toFixed(2)}</p>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${product.id}, this.value)">
                        <button onclick="removeFromCart(${product.id})">Remove</button>
                    `;
                    cartItemsContainer.appendChild(cartItem);

                    subtotal += product.price * item.quantity;
                    totalElem.textContent = `Total: $${subtotal.toFixed(2)}`;
                    subtotalElem.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
                }
            })
            .catch(error => console.error('Error fetching product data:', error));
    });
});

function updateQuantity(productId, quantity) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity, 10);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        window.location.reload();
    }
}

function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.location.reload();
}

function proceedToCheckout() {
    window.location.href = 'checkout.html';
}
