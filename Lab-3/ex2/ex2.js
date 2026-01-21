(function() {
    const style = document.createElement('style');
    style.textContent = `
        #cart-system { font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; background: #fff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .product-list, .cart-items { border-bottom: 2px solid #eee; padding-bottom: 15px; margin-bottom: 15px; }
        .item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f9f9f9; }
        .btn { padding: 5px 10px; cursor: pointer; border-radius: 4px; border: none; transition: 0.2s; }
        .btn-add { background: #3498db; color: white; }
        .btn-rem { background: #e74c3c; color: white; }
        .summary { background: #f8f9fa; padding: 15px; border-radius: 8px; }
        .discount-note { color: #27ae60; font-size: 0.85rem; font-weight: bold; }
        .total-row { display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold; margin-top: 10px; }
        input[type="text"] { padding: 8px; width: 60%; border: 1px solid #ddd; border-radius: 4px; }
        .badge { background: #f39c12; color: white; padding: 2px 6px; border-radius: 10px; font-size: 0.7rem; }
    `;
    document.head.appendChild(style);

    const products = [
        { id: 1, name: "Laptop", price: 1000, category: "Tech" },
        { id: 2, name: "Headphones", price: 200, category: "Tech" },
        { id: 3, name: "Coffee Mug", price: 20, category: "Home" },
        { id: 4, name: "Desk Lamp", price: 50, category: "Home" }
    ];

    let cart = [];

    const container = document.createElement('div');
    container.id = 'cart-system';
    document.body.appendChild(container);

    function render() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let discount = 0;
        let discountMessages = [];

        if (subtotal > 500) {
            const bulkSavings = subtotal * 0.1;
            discount += bulkSavings;
            discountMessages.push("Bulk Discount (10% off orders > $500)");
        }

        const techItems = cart.filter(i => i.category === "Tech").reduce((sum, i) => sum + i.quantity, 0);
        if (techItems >= 2) {
            const techSavings = 25;
            discount += techSavings;
            discountMessages.push("Tech Bundle Discount ($25 off)");
        }

        const hour = new Date().getHours();
        if (hour >= 18 || hour <= 6) {
            const nightSavings = subtotal * 0.05;
            discount += nightSavings;
            discountMessages.push("Night Owl Special (5% off)");
        }

        const finalTotal = Math.max(0, subtotal - discount);

        container.innerHTML = `
            <h2>Intelligent Shopping Cart</h2>
            
            <div class="product-list">
                <h3>Available Products</h3>
                ${products.map(p => `
                    <div class="item">
                        <span>${p.name} - $${p.price} <small class="badge">${p.category}</small></span>
                        <button class="btn btn-add" onclick="window.addToCart(${p.id})">Add to Cart</button>
                    </div>
                `).join('')}
            </div>

            <div class="cart-items">
                <h3>Your Cart</h3>
                ${cart.length === 0 ? '<p>Cart is empty</p>' : cart.map(item => `
                    <div class="item">
                        <span>${item.name} (x${item.quantity})</span>
                        <div>
                            $${item.price * item.quantity}
                            <button class="btn btn-rem" onclick="window.removeFromCart(${item.id})" style="margin-left:10px">Remove</button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="summary">
                <div>Subtotal: $${subtotal.toFixed(2)}</div>
                ${discountMessages.map(msg => `<div class="discount-note">- ${msg}</div>`).join('')}
                <div class="total-row">
                    <span>Total:</span>
                    <span>$${finalTotal.toFixed(2)}</span>
                </div>
                <div style="margin-top:15px">
                    <input type="text" id="couponInput" placeholder="Enter Coupon (e.g. SAVE10)">
                    <button class="btn btn-add" onclick="window.applyCoupon()">Apply</button>
                </div>
                <div id="couponMsg" class="error-text" style="margin-top:5px; font-size:0.8rem"></div>
            </div>
        `;
    }

    window.addToCart = (id) => {
        const product = products.find(p => p.id === id);
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        render();
    };

    window.removeFromCart = (id) => {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        }
        render();
    };

    window.applyCoupon = () => {
        const code = document.getElementById('couponInput').value.trim().toUpperCase();
        const msgDiv = document.getElementById('couponMsg');
        
        if (code === "SAVE10") {
            msgDiv.style.color = "#27ae60";
            msgDiv.textContent = "Coupon 'SAVE10' applied successfully! (Simulated)";
        } else if (code.length < 4) {
            msgDiv.style.color = "#e74c3c";
            msgDiv.textContent = "Coupon code too short.";
        } else {
            msgDiv.style.color = "#e74c3c";
            msgDiv.textContent = "Invalid coupon code.";
        }
    };

    render();
})();