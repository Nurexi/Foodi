// cart-functionality.js

document.addEventListener("DOMContentLoaded", () => {
    const cartManager = new CartManager();
    cartManager.renderCart();

    // Update cart badge on page load
    cartManager.updateCartBadge();
});

class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("foodiCart") || "[]");
        this.cartBadge = document.getElementById("cart-badge");
        this.deliveryFee = 5.99;
        this.taxRate = 0.08;
        this.freeDeliveryThreshold = 50;
        this.init();
    }

    init() {
        this.updateCartBadge();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener("click", (e) => {
            // Cart page specific handlers
            if (e.target.closest('.quantity-btn')) {
                const btn = e.target.closest('.quantity-btn');
                const itemId = btn.dataset.itemId;
                const action = btn.dataset.action;
                this.updateQuantity(itemId, action);
            }

            if (e.target.closest('.remove-btn')) {
                const btn = e.target.closest('.remove-btn');
                const itemId = btn.dataset.itemId;
                this.removeItem(itemId);
            }

            if (e.target.closest('.checkout-btn')) {
                this.processCheckout();
            }
        });

        // Quantity input change
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const itemId = e.target.dataset.itemId;
                const newQuantity = parseInt(e.target.value) || 1;
                this.setQuantity(itemId, newQuantity);
            }
        });
    }

    updateCartBadge() {
        if (this.cartBadge) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            this.cartBadge.textContent = totalItems;

            if (totalItems > 0) {
                this.cartBadge.style.display = "flex";
                this.cartBadge.classList.add("animate-pulse");
                setTimeout(() => {
                    this.cartBadge.classList.remove("animate-pulse");
                }, 600);
            } else {
                this.cartBadge.style.display = "none";
            }
        }
    }

    // Cart page methods
    renderCart() {
        const cartContent = document.getElementById('cart-content');
        
        if (this.cart.length === 0) {
            cartContent.innerHTML = this.renderEmptyCart();
            return;
        }

        cartContent.innerHTML = `
            <div class="cart-items">
                <h2>Order Items</h2>
                ${this.cart.map(item => this.renderCartItem(item)).join('')}
            </div>
            <div class="cart-summary">
                ${this.renderCartSummary()}
            </div>
        `;
    }

    renderEmptyCart() {
        return `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any items to your cart yet. Browse our delicious menu and add some items!</p>
                <a href="index.html" class="continue-shopping">
                    <i class="fas fa-utensils"></i>
                    Browse Menu
                </a>
            </div>
        `;
    }

    renderCartItem(item) {
        const itemTotal = (parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2);
        
        return `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <div class="cart-item-price">${item.price} each</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" data-item-id="${item.id}" data-action="decrease" ${item.quantity <= 1 ? 'disabled' : ''}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-item-id="${item.id}">
                    <button class="quantity-btn" data-item-id="${item.id}" data-action="increase">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-total">$${itemTotal}</div>
                <button class="remove-btn" data-item-id="${item.id}" title="Remove item">
                    <i class="fas fa-trash"></i>
                </button>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-item-id="${item.id}" data-action="decrease" ${item.quantity <= 1 ? 'disabled' : ''}>
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-item-id="${item.id}">
                        <button class="quantity-btn" data-item-id="${item.id}" data-action="increase">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div class="cart-item-total">$${itemTotal}</div>
                        <button class="remove-btn" data-item-id="${item.id}" title="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderCartSummary() {
        const subtotal = this.calculateSubtotal();
        const deliveryFee = subtotal >= this.freeDeliveryThreshold ? 0 : this.deliveryFee;
        const tax = subtotal * this.taxRate;
        const total = subtotal + deliveryFee + tax;

        return `
            <h3 class="summary-header">Order Summary</h3>
            
            <div class="summary-row">
                <span class="summary-label">Subtotal (${this.getTotalItems()} items)</span>
                <span class="summary-value">$${subtotal.toFixed(2)}</span>
            </div>
            
            <div class="summary-row">
                <span class="summary-label">Delivery Fee</span>
                <span class="summary-value ${deliveryFee === 0 ? 'text-success' : ''}">
                    ${deliveryFee === 0 ? 'FREE' : '$' + deliveryFee.toFixed(2)}
                </span>
            </div>
            
            <div class="summary-row">
                <span class="summary-label">Tax</span>
                <span class="summary-value">$${tax.toFixed(2)}</span>
            </div>
            
            <div class="summary-row total">
                <span class="summary-label">Total</span>
                <span class="summary-value">$${total.toFixed(2)}</span>
            </div>
            
            <button class="checkout-btn" ${this.cart.length === 0 ? 'disabled' : ''}>
                <i class="fas fa-credit-card"></i>
                Proceed to Checkout
            </button>
        `;
    }

    updateQuantity(itemId, action) {
        const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
        if (itemElement) {
            itemElement.classList.add('updating');
            setTimeout(() => itemElement.classList.remove('updating'), 300);
        }

        const itemIndex = this.cart.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            if (action === 'increase') {
                this.cart[itemIndex].quantity += 1;
            } else if (action === 'decrease' && this.cart[itemIndex].quantity > 1) {
                this.cart[itemIndex].quantity -= 1;
            }
            
            this.saveCart();
            this.renderCart();
            this.updateCartBadge();
        }
    }

    setQuantity(itemId, quantity) {
        if (quantity < 1) quantity = 1;
        if (quantity > 99) quantity = 99;

        const itemIndex = this.cart.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            this.cart[itemIndex].quantity = quantity;
            this.saveCart();
            this.renderCart();
            this.updateCartBadge();
        }
    }

    removeItem(itemId) {
        const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
        if (itemElement) {
            itemElement.classList.add('removing');
            setTimeout(() => {
                this.cart = this.cart.filter(item => item.id !== itemId);
                this.saveCart();
                this.renderCart();
                this.updateCartBadge();
            }, 300);
        }
    }

    processCheckout() {
        if (this.cart.length === 0) return;

        const checkoutBtn = document.querySelector('.checkout-btn');
        checkoutBtn.innerHTML = '<div class="spinner"></div> Processing...';
        checkoutBtn.disabled = true;

        setTimeout(() => {
            alert('Order placed successfully! Thank you for your purchase.');
            this.cart = [];
            this.saveCart();
            this.updateCartBadge();
            this.renderCart();
            
            checkoutBtn.innerHTML = '<i class="fas fa-credit-card"></i> Proceed to Checkout';
            checkoutBtn.disabled = false;
        }, 2000);
    }

    calculateSubtotal() {
        return this.cart.reduce((total, item) => {
            return total + (parseFloat(item.price.replace('$', '')) * item.quantity);
        }, 0);
    }

    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('foodiCart', JSON.stringify(this.cart));
    }

    getCartItems() {
        return this.cart;
    }

    clearCart() {
        this.cart = [];
        localStorage.setItem("foodiCart", JSON.stringify(this.cart));
        this.updateCartBadge();
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace("$", ""));
            return total + price * item.quantity;
        }, 0);
    }

    getCartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }
}