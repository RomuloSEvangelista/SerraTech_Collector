const API_URL = "https://69f60881a72f01a951b91cd8.mockapi.io/cards";

// --- Lógica de Registro ---
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirm = document.getElementById('confirmPassword').value;

        if (password !== confirm) {
            alert("Senhas não conferem!");
            return;
        }

        try {
            // 1. Buscamos TODOS os usuários para filtrar manualmente
            const res = await fetch(API_URL);
            const todosUsuarios = await res.json();

            // 2. Verificamos se o e-mail já existe na lista retornada
            const usuarioExiste = todosUsuarios.find(u => u["e-mail"] === email || u["email"] === email);

            if (usuarioExiste) {
                alert("Este e-mail já está cadastrado!");
                return; // Para o processo aqui
            }

            // 3. Se não existir, fazemos o POST
            const saveRes = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    "e-mail": email, 
                    "senha": password 
                })
            });

            if (saveRes.ok) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "login.html";
            }

        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
}