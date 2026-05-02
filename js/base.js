// ==========================================
// 1. BANCO DE DADOS (DATA)
// ==========================================
const cardsData = [
    { id: 1, name: "Prof. Raphael", price: 80.00, type: "Logica de Programação", img: "../img/Raphael.png", desc: "Loop Infinito de Conhecimento." },
    { id: 2, name: "Prof. Romulo", price: 65.00, type: "Banco de Dados", img: "../img/Romulo.png", desc: "Habilidade: Aprende enquanto ensina." },
    { id: 3, name: "Ivy", price: 3.00, type: "Alunos", img: "../img/ivy.png", desc: "Comunicação rápida e eficiente." },
    { id: 4, name: "Prof. Breno", price: 70.00, type: "POO", img: "../img/breno.png", desc: "Mago POO. Encapsula erros." },
    { id: 5, name: "Prof. Menegueli", price: 85.00, type: "Front End", img: "../img/menegueli.png", desc: "Mestre das interfaces." }
];

// ==========================================
// 2. GESTÃO DE SESSÃO E ACESSO
// ==========================================
function logoutSerratec() {
    localStorage.removeItem('usuarioLogado');
    alert("Sessão encerrada!");
    window.location.href = "../login/login.html";
}

function verificarProtecaoDeRota() {
    const path = window.location.pathname;
    const paginaAtual = path.split("/").pop();
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    // Páginas que QUALQUER UM pode ver
    const paginasPublicas = ["", "index.html", "login.html", "register.html"];
    const ehPaginaPublica = paginasPublicas.includes(paginaAtual);

    if (!usuarioLogado && !ehPaginaPublica) {
        alert("Acesso restrito! Por favor, faça login para continuar.");
        // Redirecionamento inteligente baseado na pasta atual
        const destino = (paginaAtual === "catalogo.html" || paginaAtual === "colecao.html") 
            ? "../login/login.html" 
            : "./login/login.html";
        window.location.href = destino;
        return false;
    }
    return true;
}

// ==========================================
// 3. SISTEMA DE CARRINHO E COMPRA
// ==========================================
window.updateCartCounter = function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const counter = document.getElementById('cart-count');
    if (counter) counter.innerText = cart.length;
};

window.addToCart = function(id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cardsData.find(p => p.id === id);
    
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        alert(`${product.name} adicionado ao deck!`);
    }
};

window.finalizarCompra = function() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const carrinho = JSON.parse(localStorage.getItem('cart')) || [];

    if (!usuarioLogado) {
        alert("Você precisa estar logado para finalizar a compra.");
        return;
    }

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const usuarioId = usuarioLogado.email || usuarioLogado["e-mail"];
    const chaveColecao = `deck_${usuarioId}`;
    
    const colecaoAtual = JSON.parse(localStorage.getItem(chaveColecao)) || [];
    const novaColecao = [...colecaoAtual, ...carrinho];
    
    localStorage.setItem(chaveColecao, JSON.stringify(novaColecao));
    localStorage.removeItem('cart');
    
    alert("Compra realizada com sucesso! Verifique sua coleção.");
    window.location.href = "../colecao/colecao.html";
};

// ==========================================
// 4. INTERFACE (RENDERIZAÇÃO E FILTROS)
// ==========================================
function renderizarCards(lista) {
    const container = document.getElementById('card-container');
    if (!container) return;

    container.innerHTML = lista.map(card => `
        <div class="col">
            <div class="card card-item h-100 bg-dark text-white shadow">
                <img src="${card.img}" 
                     class="card-img-top p-2" 
                     alt="${card.name}"
                     style="height: 350px; width: 100%; object-fit: contain; background: #000;"
                     onerror="this.onerror=null; this.src='../img/padrao.png';"> 
                
                <div class="card-body text-center d-flex flex-column">
                    <h5 class="card-title text-warning">${card.name}</h5>
                    <p class="mb-1 text-white-50 small">${card.desc}</p>
                    <p class="mb-3">
                        <span class="badge bg-primary">${card.type}</span>
                    </p>
                    <p class="fw-bold text-success">R$ ${card.price.toFixed(2)}</p>
                    
                    <div class="mt-auto">
                        <button class="btn btn-outline-warning w-100" onclick="addToCart(${card.id})">
                            🛒 Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function aplicarFiltros() {
    const termoBusca = document.getElementById('searchInput')?.value.toLowerCase() || "";
    const classeSelecionada = document.getElementById('filterType')?.value || "all";

    const listaFiltrada = cardsData.filter(card => {
        const nomeBate = card.name.toLowerCase().includes(termoBusca);
        const classeBate = (classeSelecionada === "all") || (card.type === classeSelecionada);
        return nomeBate && classeBate;
    });

    renderizarCards(listaFiltrada);
}

// ==========================================
// 5. INICIALIZAÇÃO (BOOTSTRAP DA APP)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se o usuário tem permissão para estar nesta página
    if (!verificarProtecaoDeRota()) return;

    // Se a página possuir o container de cartas, renderiza e ativa filtros
    if (document.getElementById('card-container')) {
        renderizarCards(cardsData);
        document.getElementById('searchInput')?.addEventListener('input', aplicarFiltros);
        document.getElementById('filterType')?.addEventListener('change', aplicarFiltros);
    }

    // Atualiza interface do carrinho
    updateCartCounter();
});