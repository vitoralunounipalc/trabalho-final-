// =========================
// Chave de armazenamento no navegador
// =========================
const CART_STORAGE_KEY = 'meuEcommerceCarrinho';

// =========================
// Ações iniciais ao carregar a página
// =========================
document.addEventListener('DOMContentLoaded', () => {
    // Atualiza o número de itens no ícone do carrinho
    updateCartIconCount();

    // Seleciona todos os botões "Adicionar ao Carrinho"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Adiciona eventos de clique aos botões
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Pega os dados do produto no botão
            const productName = event.target.dataset.name;
            const productPrice = event.target.dataset.price;

            // Adiciona o produto ao carrinho
            addProductToCart(productName, productPrice);
        });
    });
});

// =========================
// Função: Buscar carrinho salvo no navegador
// =========================
function getCartFromStorage() {
    const cartString = localStorage.getItem(CART_STORAGE_KEY);
    // Converte o texto salvo em array ou retorna array vazio
    return cartString ? JSON.parse(cartString) : [];
}

// =========================
// Função: Salvar carrinho atualizado no navegador
// =========================
function saveCartToStorage(cartArray) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartArray));
}

// =========================
// Função: Adicionar produto ao carrinho
// =========================
function addProductToCart(name, priceString) {
    const cart = getCartFromStorage(); // Pega o carrinho atual
    const price = parseFloat(priceString); // Converte preço para número

    // Cria um novo produto com ID único
    const newProduct = {
        id: name.replace(/\s+/g, '-') + '_' + Date.now(),
        name: name,
        price: price
    };

    // Adiciona o produto ao carrinho e salva
    cart.push(newProduct);
    saveCartToStorage(cart);

    // Informa o usuário e atualiza o ícone do carrinho
    alert(`${name} foi adicionado ao carrinho!`);
    updateCartIconCount();
}

// =========================
// Função: Atualizar o ícone do carrinho com o número de itens
// =========================
function updateCartIconCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = getCartFromStorage();
        cartCountElement.textContent = cart.length;
    }
}
