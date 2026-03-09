// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const btnCreateAccount = document.getElementById('btnCreateAccount');
const messageDiv = document.getElementById('message');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Função para exibir mensagens
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    
    // Auto-esconder após 3 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.className = 'message';
    }, 3000);
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para validar senha
function isValidPassword(password) {
    return password.length >= 6;
}

// Evento de submit do formulário de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validações
    if (!email || !password) {
        showMessage('Por favor, preencha todos os campos!', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMessage('Por favor, insira um e-mail válido!', 'error');
        return;
    }

    if (!isValidPassword(password)) {
        showMessage('A senha deve ter pelo menos 6 caracteres!', 'error');
        return;
    }

    // Simulação de login bem-sucedido
    showMessage('Login realizado com sucesso! Redirecionando...', 'success');
    
    // Aqui você pode adicionar a lógica real de autenticação
    console.log('Tentativa de login:', { email, password });
    
    // Limpar formulário após sucesso (opcional)
    setTimeout(() => {
        loginForm.reset();
    }, 2000);
});

// Evento do botão "Criar Nova Conta"
btnCreateAccount.addEventListener('click', () => {
    // Simulação de criação de conta
    showMessage('Redirecionando para criação de conta...', 'success');
    
    // Aqui você pode redirecionar para a página de registro
    console.log('Redirecionar para criação de conta');
    
    // Simulação de redirecionamento após 2 segundos
    setTimeout(() => {
        alert('Página de criação de conta (simulação)');
    }, 2000);
});

// Validação em tempo real do email (opcional)
emailInput.addEventListener('blur', (e) => {
    const email = e.target.value.trim();
    if (email && !isValidEmail(email)) {
        e.target.style.borderColor = '#dc3545';
    } else {
        e.target.style.borderColor = '#e0e0e0';
    }
});

emailInput.addEventListener('focus', (e) => {
    e.target.style.borderColor = '#e0e0e0';
});

// Validação em tempo real da senha (opcional)
passwordInput.addEventListener('blur', (e) => {
    const password = e.target.value;
    if (password && !isValidPassword(password)) {
        e.target.style.borderColor = '#dc3545';
    } else {
        e.target.style.borderColor = '#e0e0e0';
    }
});

passwordInput.addEventListener('focus', (e) => {
    e.target.style.borderColor = '#e0e0e0';
});

// Verificação de imagem da logo
const logoImg = document.querySelector('.logo img');
if (logoImg) {
    logoImg.onerror = function() {
        console.log('Logo não encontrada em imgs/logolobo.png. Usando emoji como fallback.');
        this.style.display = 'none';
        this.parentElement.innerHTML = '🐺';
    };
}

// Função adicional para simular autenticação real (opcional)
function authenticateUser(email, password) {
    // Aqui você faria uma chamada AJAX/fetch para seu backend
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulação de resposta do servidor
            if (email === 'teste@email.com' && password === '123456') {
                resolve({ success: true, message: 'Login bem-sucedido!' });
            } else {
                reject({ success: false, message: 'E-mail ou senha inválidos!' });
            }
        }, 1000);
    });
}
