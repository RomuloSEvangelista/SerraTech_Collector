const API_URL = "https://69f60881a72f01a951b91cd8.mockapi.io/serratecCards/loginCardsSerratec";

// --- LOGICA DE REGISTRO ---
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            // 1. Verificar se o e-mail já existe (Evitar duplicados)
            const response = await fetch(`${API_URL}?e-mail=${email}`);
            const users = await response.json();

            if (users.length > 0) {
                alert("Este e-mail já está cadastrado!");
                return;
            }

            // 2. Se não existir, criar novo usuário
            const newUser = {
                "e-mail": email,
                "senha": password
            };

            const saveResponse = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            if (saveResponse.ok) {
                alert("Conta criada com sucesso! Redirecionando para login...");
                window.location.href = "login.html";
            }
        } catch (error) {
            console.error("Erro no registro:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
}

// --- LOGICA DE LOGIN ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Buscar usuário pelo e-mail
            const response = await fetch(`${API_URL}?e-mail=${email}`);
            const users = await response.json();

            if (users.length > 0) {
                const user = users[0];
                
                // Verificar senha
                if (user.senha === password) {
                    alert("Login realizado com sucesso!");
                    // Salvar sessão simples
                    localStorage.setItem('usuarioLogado', JSON.stringify(user));
                    window.location.href = "index.html";
                } else {
                    alert("Senha incorreta!");
                }
            } else {
                alert("Usuário não encontrado!");
            }
        } catch (error) {
            console.error("Erro no login:", error);
            alert("Erro ao processar login.");
        }
    });
}

// Função de Logout (usada no botão 'Sair' da Navbar)
function logoutSerratec() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = "login.html";
}