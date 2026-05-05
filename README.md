# 🃏 Serratec Collector - Deck Builder

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Tech](https://img.shields.io/badge/Tech-FullStack%20Web-blue)

O **Serratec Collector** é uma plataforma interativa de gerenciamento e coleção de cartas digitais inspirada em Trading Card Games (TCG). O projeto foi desenvolvido para a cohort Serratec 2026, transformando professores e alunos em cartas colecionáveis com habilidades e raridades únicas.

## 🚀 Funcionalidades

- **Grimório (Catálogo):** Visualização de todas as cartas disponíveis no ecossistema.
- **Sistema de Filtros:** Busca dinâmica por nome e filtragem por classes (Lógica, Banco de Dados, POO, Front-End e Alunos).
- **Loja Interativa:** Sistema de "Tentar a Sorte" para adquirir novos cards.
- **Minha Coleção:** Espaço exclusivo onde o usuário visualiza suas cartas adquiridas e o valor total do seu patrimônio.
- **Carrinho de Compras:** Gestão de itens antes da aquisição definitiva.
- **Autenticação:** Sistema de login para persistência de dados do usuário.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web modernas:

*   **HTML5:** Estrutura semântica das páginas.
*   **CSS3 (Bootstrap 5):** Estilização responsiva e componentes de interface.
*   **JavaScript (ES6+):** Lógica de filtragem, manipulação do DOM e gestão de estado.
*   **LocalStorage:** Persistência de dados do usuário e da coleção sem necessidade de banco de dados externo inicial.
*   **Google Fonts:** Tipografia temática (Cinzel e Inter).

## 📁 Estrutura do Projeto
```text
├── css/            # Estilos personalizados
├── img/            # Assets de imagem e artes das cartas
├── js/
│   ├── base.js     # Lógica global e autenticação
│   ├── catalogo.js # Filtros e renderização da vitrine
│   ├── colecao.js  # Gestão da coleção do usuário
│   └── cart.js     # Lógica do carrinho de compras
├── pages/          # Páginas do sistema (Coleção, Catálogo, Loja)
└── index.html      # Página principal