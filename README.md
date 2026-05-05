# 🃏 Serratec Collector - Deck Builder

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Tech](https://img.shields.io/badge/Tech-FullStack%20Web-blue)
![License](https://img.shields.io/badge/License-MIT-green)

O **Serratec Collector** é uma plataforma interativa de gerenciamento e coleção de cartas digitais inspirada no universo dos Trading Card Games (TCG). O projeto foi desenvolvido para a cohort Serratec 2026, transformando instrutores e alunos em cartas colecionáveis com habilidades e atributos únicos.

## 🔗 Demonstração ao Vivo
Experimente o projeto em tempo real:
👉 **[Acessar Serratec Collector](https://romulosevangelista.github.io/Teste/index.html)**

---

## 🚀 Funcionalidades Implementadas

- **Grimório de Mestres (Catálogo):** Visualização completa de todas as cartas disponíveis no sistema.
- **Busca e Filtragem em Tempo Real:** Filtro dinâmico por nome e por categorias (Lógica, Banco de Dados, POO, Front-End e Alunos).
- **Minha Coleção:** Área restrita para o usuário visualizar suas cartas adquiridas e acompanhar o valor total de seu patrimônio.
- **Sistema de Loja & Carrinho:** Fluxo de seleção de itens e simulação de compra.
- **Persistência de Dados:** Utilização de `LocalStorage` para manter a sessão do usuário e sua coleção salva entre acessos.
- **Segurança Básica:** Proteção de rotas que redireciona usuários não logados para a tela de login.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Bootstrap 5) e JavaScript Vanila (ES6+).
- **Estilização:** Google Fonts (Cinzel para títulos épicos e Inter para leitura).
- **Ícones:** Bootstrap Icons e integração com SVG para redes sociais.
- **Deploy:** GitHub Pages.

## 📁 Estrutura de Arquivos
```text
├── css/            # Estilos customizados e overrides do Bootstrap
├── img/            # Artes das cartas e ilustrações do projeto
├── js/
│   ├── base.js     # Funções globais (Logout, Saldo, Base de Dados)
│   ├── catalogo.js # Lógica de filtragem e renderização da vitrine
│   ├── colecao.js  # Gestão da biblioteca pessoal do usuário
│   └── cart.js     # Manipulação do carrinho de compras
├── pages/          # Páginas internas do sistema
└── index.html      # Landing Page e ponto de entrada
