// Define a chave usada para armazenar o carrinho no navegador (localStorage)
const CART_STORAGE_KEY = 'meuEcommerceCarrinho';

// Quando a página for carregada completamente
document.addEventListener('DOMContentLoaded', () => {
    // Atualiza o número de itens exibido no ícone do carrinho
    updateCartIconCount();

    // Seleciona todos os botões de "Adicionar ao Carrinho"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Para cada botão encontrado...
    addToCartButtons.forEach(button => {
        // Adiciona um evento de clique
        button.addEventListener('click', (event) => {
            // Pega o nome e o preço do produto (armazenados no botão via dataset)
            const productName = event.target.dataset.name;
            const productPrice = event.target.dataset.price;

            // Adiciona o produto ao carrinho
            addProductToCart(productName, productPrice);
        });
    });
});

// Função para buscar o carrinho que está salvo no navegador
function getCartFromStorage() {
    const cartString = localStorage.getItem(CART_STORAGE_KEY);
    // Se existir, transforma o texto salvo em array (lista)
    return cartString ? JSON.parse(cartString) : [];
}

// Função para salvar o carrinho atualizado no navegador
function saveCartToStorage(cartArray) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartArray));
}

// Função para adicionar um novo produto ao carrinho
function addProductToCart(name, priceString) {
    const cart = getCartFromStorage(); // pega o carrinho atual
    const price = parseFloat(priceString); // transforma o preço em número
    const newProduct = {
        // Cria um ID único para o produto, usando o nome e a hora atual
        id: name.replace(/\s+/g, '-') + '_' + Date.now(),
        name: name,
        price: price
    };
    cart.push(newProduct); // adiciona o novo produto no carrinho
    saveCartToStorage(cart); // salva o carrinho de volta no navegador
    alert(`${name} foi adicionado ao carrinho!`); // mostra mensagem ao usuário
    updateCartIconCount(); // atualiza o número de itens no ícone
}

// Função para atualizar o número no ícone do carrinho
function updateCartIconCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = getCartFromStorage(); // pega os produtos salvos
        cartCountElement.textContent = cart.length; // mostra quantos produtos tem
    }
}
