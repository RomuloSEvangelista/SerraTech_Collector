/**
 * js/catalogo.js
 * Lógica específica para a página "Cartas Disponíveis"
 */

const cartasDisponiveis = [
    { id: 1, name: "Prof. Raphael",                  price: 50.00, type: "Logica de Programação", img: "../img/Raphael.png",   desc: "Poder especial: Loop Infinito de Conhecimento." },
    { id: 2, name: "Mestre dos Dados (Prof. Romulo)", price: 45.00, type: "Banco de Dados",        img: "../img/Romulo.png",    desc: "Habilidade: Aprende enquanto ensina." },
    { id: 3, name: "Ivy",                             price: 3.00,  type: "Alunos",                img: "../img/ivy.png",       desc: "Habilidade: Comunicação rápida e eficiente ninguém pergunta nada." },
    { id: 4, name: "Prof. Breno",                     price: 55.00, type: "POO",                   img: "../img/breno.png",     desc: "Mago POO." },
    { id: 5, name: "Prof. Menegueli",                 price: 65.00, type: "Front End",             img: "../img/menegueli.png", desc: "Mestre do Front End." }
];

const containerCatalogo = document.getElementById('card-container-catalogo');
const searchInput = document.getElementById('searchInputCatalogo');
const filterSelect = document.getElementById('filterTypeCatalogo');

function renderizarTodoCatalogo(listaDeCartas) {
    if (!containerCatalogo) return;
    containerCatalogo.innerHTML = "";

    if (listaDeCartas.length === 0) {
        containerCatalogo.innerHTML = `
            <div class="col-12 text-center my-5 text-white">
                <p class="opacity-50">Nenhum card encontrado no grimório para esta busca.</p>
            </div>`;
        return;
    }

    listaDeCartas.forEach(card => {
        let badgeColor = "bg-primary";
        if (card.type === "Banco de Dados") badgeColor = "bg-success";
        if (card.type === "Alunos")         badgeColor = "bg-secondary";
        if (card.type === "POO")            badgeColor = "bg-danger";

        containerCatalogo.innerHTML += `
            <div class="col">
                <div class="card h-100 card-item shadow-lg border-0 bg-dark text-white overflow-hidden">
                    <img src="${card.img}" class="card-img-top p-2" alt="${card.name}"
                         style="height: 380px; object-fit: contain;"
                         onerror="this.src='https://placehold.co/350x450?text=Card+Em+Breve'">
                    <div class="card-body d-flex flex-column text-center">
                        <span class="badge ${badgeColor} mb-2">${card.type.toUpperCase()}</span>
                        <h5 class="card-title fw-bold" style="font-family: 'Cinzel', serif;">${card.name}</h5>
                        <p class="small text-light fst-italic">"${card.desc}"</p>
                        <p class="text-warning fw-bold mt-auto fs-5">R$ ${card.price.toFixed(2).replace('.', ',')}</p>
                        <button onclick="addToCart(${card.id})" class="btn btn-outline-light w-100 mt-2">
                            Adicionar ao Deck
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function aplicarFiltrosCatalogo() {
    const termoBusca = searchInput.value.toLowerCase();
    const classeSelecionada = filterSelect.value;

    const cartasFiltradas = cartasDisponiveis.filter(card => {
        const correspondeBusca = card.name.toLowerCase().includes(termoBusca);
        const correspondeClasse = classeSelecionada === "all" || card.type === classeSelecionada;
        return correspondeBusca && correspondeClasse;
    });

    renderizarTodoCatalogo(cartasFiltradas);
}

function updateCartCounterCatalogo() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const counter = document.getElementById('cart-count');
    if (counter) counter.innerText = cart.length;
}

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('usuarioLogado')) {
        window.location.replace("../login/login.html");
        return;
    }

    renderizarTodoCatalogo(cartasDisponiveis);
    updateCartCounterCatalogo();

    if (searchInput) searchInput.addEventListener('input', aplicarFiltrosCatalogo);
    if (filterSelect) filterSelect.addEventListener('change', aplicarFiltrosCatalogo);
});