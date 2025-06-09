// Define a chave usada para armazenar o carrinho no localStorage
const CART_STORAGE_KEY = 'meuEcommerceCarrinho';

// Quando o DOM for totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    updateCartIconCount(); // Atualiza a quantidade de itens no ícone do carrinho
    displayCartItems();    // Exibe os itens do carrinho na tabela

    // Pega o botão de "Limpar Carrinho"
    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        // Se existir, adiciona um evento de clique para limpar o carrinho
        clearCartButton.addEventListener('click', handleClearCart);
    }

    // Pega o corpo da tabela de itens do carrinho
    const cartItemsBody = document.getElementById('cart-items-body');
    if (cartItemsBody) {
        // Adiciona um evento de clique para remover itens individualmente
        cartItemsBody.addEventListener('click', (event) => {
            // Verifica se o botão clicado tem a classe de "remover"
            if (event.target.classList.contains('remove-item-btn')) {
                const productIdToRemove = event.target.dataset.id; // Pega o ID do produto
                removeProductFromCart(productIdToRemove); // Remove o produto
            }
        });
    }
});

// Recupera o carrinho salvo no localStorage
function getCartFromStorage() {
    const cartString = localStorage.getItem(CART_STORAGE_KEY);
    return cartString ? JSON.parse(cartString) : []; // Converte para array ou retorna vazio
}

// Salva o carrinho atualizado no localStorage
function saveCartToStorage(cartArray) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartArray));
}

// Formata um número para o formato de moeda BRL (R$)
function formatPriceBRL(price) {
    if (typeof price !== 'number') {
        price = parseFloat(price) || 0;
    }
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Atualiza o número de itens no ícone do carrinho
function updateCartIconCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = getCartFromStorage();
        cartCountElement.textContent = cart.length;
    }
}

// Remove um produto do carrinho com base no ID
function removeProductFromCart(productId) {
    let cart = getCartFromStorage(); // Pega o carrinho atual
    const updatedCart = cart.filter(item => item.id !== productId); // Remove o item pelo ID
    saveCartToStorage(updatedCart); // Salva o novo carrinho
    updateCartIconCount(); // Atualiza ícone
    displayCartItems(); // Atualiza visualmente os itens
}

// Exibe os itens do carrinho na tabela
function displayCartItems() {
    const cart = getCartFromStorage();
    const cartItemsBody = document.getElementById('cart-items-body'); // Corpo da tabela
    const cartTotalElement = document.getElementById('cart-total'); // Elemento que mostra o total
    const emptyCartMessage = document.getElementById('empty-cart-message'); // Mensagem de carrinho vazio
    const cartTable = document.getElementById('cart-table'); // A tabela completa
    const cartSummary = document.querySelector('.cart-summary'); // Resumo do carrinho

    if (!cartItemsBody) {
        return; // Se não achar a tabela, não faz nada
    }

    cartItemsBody.innerHTML = ''; // Limpa a tabela antes de exibir de novo
    let currentTotal = 0; // Total de preços dos produtos

    // Se o carrinho estiver vazio
    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block'; // Mostra a mensagem
        if (cartTable) cartTable.style.display = 'none'; // Esconde a tabela
        if (cartSummary) cartSummary.style.display = 'none'; // Esconde o resumo
    } else {
        // Se tiver produtos, mostra a tabela e o resumo
        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        if (cartTable) cartTable.style.display = 'table';
        if (cartSummary) cartSummary.style.display = 'block';

        // Para cada item do carrinho, cria uma linha na tabela
        cart.forEach((item) => {
            const row = cartItemsBody.insertRow(); // Cria uma nova linha
            const itemName = item && item.name ? item.name : 'Produto Desconhecido';
            const itemPrice = item && typeof item.price === 'number' ? item.price : 0;

            // Preenche a linha com os dados
            row.innerHTML = `
                <td>${itemName}</td>
                <td>${formatPriceBRL(itemPrice)}</td>
                <td><button class="remove-item-btn" data-id="${item.id}">Remover</button></td>
            `;
            currentTotal += itemPrice; // Soma o valor ao total
        });
    }

    // Exibe o total final no rodapé
    if (cartTotalElement) cartTotalElement.textContent = formatPriceBRL(currentTotal);
}

// Função chamada quando o usuário clica no botão "Limpar Carrinho"
function handleClearCart() {
    // Pede confirmação do usuário
    if (confirm('Tem certeza que deseja esvaziar o carrinho?')) {
        localStorage.removeItem(CART_STORAGE_KEY); // Remove o carrinho do localStorage
        updateCartIconCount(); // Atualiza o ícone
        displayCartItems(); // Atualiza a tela
        alert('Seu carrinho foi esvaziado!'); // Mostra mensagem
    }
}
