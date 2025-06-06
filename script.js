const CART_STORAGE_KEY = 'meuEcommerceCarrinho';

document.addEventListener('DOMContentLoaded', () => {
    updateCartIconCount();

    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.dataset.name;
            const productPrice = event.target.dataset.price;
            addProductToCart(productName, productPrice);
        });
    });
});

function getCartFromStorage() {
    const cartString = localStorage.getItem(CART_STORAGE_KEY);
    return cartString ? JSON.parse(cartString) : [];
}

function saveCartToStorage(cartArray) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartArray));
}

function addProductToCart(name, priceString) {
    const cart = getCartFromStorage();
    const price = parseFloat(priceString);
    const newProduct = {
        id: name.replace(/\s+/g, '-') + '_' + Date.now(),
        name: name,
        price: price
    };
    cart.push(newProduct);
    saveCartToStorage(cart);
    alert(`${name} foi adicionado ao carrinho!`);
    updateCartIconCount();
}

function updateCartIconCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = getCartFromStorage();
        cartCountElement.textContent = cart.length;
    }
}
