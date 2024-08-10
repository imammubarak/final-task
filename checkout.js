document.addEventListener("DOMContentLoaded", function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const orderSummaryItems = document.getElementById('order-summary-items');
    const orderTotalElem = document.getElementById('order-total');

    if (cartItems.length === 0) {
        orderSummaryItems.innerHTML = '<p>Your cart is empty.</p>';
        orderTotalElem.textContent = 'Total: $0.00';
        return;
    }

    let total = 0;

    cartItems.forEach(item => {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                const product = data.products.find(p => p.id === item.id);

                if (product) {
                    const orderItem = document.createElement('div');
                    orderItem.className = 'order-item';
                    orderItem.innerHTML = `
                        <img src="${product.images[0]}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>$${product.price.toFixed(2)} x ${item.quantity}</p>
                    `;
                    orderSummaryItems.appendChild(orderItem);

                    total += product.price * item.quantity;
                    orderTotalElem.textContent = `Total: $${total.toFixed(2)}`;
                }
            })
            .catch(error => console.error('Error fetching product data:', error));
    });

    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Order placed successfully!');
        localStorage.removeItem('cartItems');
        window.location.href = 'index.html';
    });
});
