const CART_STORAGE_KEY = 'meuEcommerceCarrinho';

document.addEventListener('DOMContentLoaded', () => {
    updateCartIconCount();
    displayCartItems();

    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', handleClearCart);
    }

    const cartItemsBody = document.getElementById('cart-items-body');
    if (cartItemsBody) {
        cartItemsBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item-btn')) {
                const productIdToRemove = event.target.dataset.id;
                removeProductFromCart(productIdToRemove);
            }
        });
    }
});

function getCartFromStorage() {
    const cartString = localStorage.getItem(CART_STORAGE_KEY);
    return cartString ? JSON.parse(cartString) : [];
}

function saveCartToStorage(cartArray) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartArray));
}

function formatPriceBRL(price) {
    if (typeof price !== 'number') {
        price = parseFloat(price) || 0;
    }
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function updateCartIconCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = getCartFromStorage();
        cartCountElement.textContent = cart.length;
    }
}

function removeProductFromCart(productId) {
    let cart = getCartFromStorage();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCartToStorage(updatedCart);
    updateCartIconCount();
    displayCartItems();
}

function displayCartItems() {
    const cart = getCartFromStorage();
    const cartItemsBody = document.getElementById('cart-items-body');
    const cartTotalElement = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTable = document.getElementById('cart-table');
    const cartSummary = document.querySelector('.cart-summary');

    if (!cartItemsBody) {
        return;
    }

    cartItemsBody.innerHTML = '';
    let currentTotal = 0;

    if (cart.length === 0) {
        if(emptyCartMessage) emptyCartMessage.style.display = 'block';
        if(cartTable) cartTable.style.display = 'none';
        if(cartSummary) cartSummary.style.display = 'none';
    } else {
        if(emptyCartMessage) emptyCartMessage.style.display = 'none';
        if(cartTable) cartTable.style.display = 'table';
        if(cartSummary) cartSummary.style.display = 'block';

        cart.forEach((item) => {
            const row = cartItemsBody.insertRow();
            const itemName = item && item.name ? item.name : 'Produto Desconhecido';
            const itemPrice = item && typeof item.price === 'number' ? item.price : 0;
            
            row.innerHTML = `
                <td>${itemName}</td>
                <td>${formatPriceBRL(itemPrice)}</td>
                <td><button class="remove-item-btn" data-id="${item.id}">Remover</button></td>
            `;
            currentTotal += itemPrice;
        });
    }
    if(cartTotalElement) cartTotalElement.textContent = formatPriceBRL(currentTotal);
}

function handleClearCart() {
    if (confirm('Tem certeza que deseja esvaziar o carrinho?')) {
        localStorage.removeItem(CART_STORAGE_KEY);
        updateCartIconCount();
        displayCartItems();
        alert('Seu carrinho foi esvaziado!');
    }
}
