document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const confirmSenhaInput = document.getElementById("confirm-senha");

  const nomeError = document.getElementById("nome-error");
  const emailError = document.getElementById("email-error");
  const senhaError = document.getElementById("senha-error");
  const confirmError = document.getElementById("confirm-error");

  const messageDiv = document.getElementById("message");

  function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = "block";

    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 3000);
  }

  function showFieldError(input, errorElement, message) {
    input.classList.add("error");
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }

  function clearFieldError(input, errorElement) {
    input.classList.remove("error");
    errorElement.textContent = "";
    errorElement.classList.remove("show");
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validateNome() {
    const nome = nomeInput.value.trim();

    if (!nome) {
      showFieldError(nomeInput, nomeError, "Digite seu nome completo");
      return false;
    }

    if (nome.length < 3) {
      showFieldError(nomeInput, nomeError, "Nome muito curto");
      return false;
    }

    clearFieldError(nomeInput, nomeError);
    return true;
  }

  function validateEmail() {
    const email = emailInput.value.trim();

    if (!email) {
      showFieldError(emailInput, emailError, "Digite seu e-mail");
      return false;
    }

    if (!isValidEmail(email)) {
      showFieldError(emailInput, emailError, "E-mail inválido");
      return false;
    }

    clearFieldError(emailInput, emailError);
    return true;
  }

  function validateSenha() {
    const senha = senhaInput.value;

    if (!senha) {
      showFieldError(senhaInput, senhaError, "Digite sua senha");
      return false;
    }

    if (senha.length < 6) {
      showFieldError(
        senhaInput,
        senhaError,
        "A senha precisa ter pelo menos 6 caracteres",
      );
      return false;
    }

    clearFieldError(senhaInput, senhaError);
    return true;
  }

  function validateConfirmSenha() {
    const senha = senhaInput.value;
    const confirmSenha = confirmSenhaInput.value;

    if (!confirmSenha) {
      showFieldError(confirmSenhaInput, confirmError, "Confirme sua senha");
      return false;
    }

    if (senha !== confirmSenha) {
      showFieldError(
        confirmSenhaInput,
        confirmError,
        "As senhas não coincidem",
      );
      return false;
    }

    clearFieldError(confirmSenhaInput, confirmError);
    return true;
  }

  nomeInput.addEventListener("input", validateNome);
  emailInput.addEventListener("input", validateEmail);
  senhaInput.addEventListener("input", validateSenha);
  confirmSenhaInput.addEventListener("input", validateConfirmSenha);

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomeValid = validateNome();
    const emailValid = validateEmail();
    const senhaValid = validateSenha();
    const confirmValid = validateConfirmSenha();

    if (!nomeValid || !emailValid || !senhaValid || !confirmValid) {
      showMessage("Corrija os erros no formulário", "error");
      return;
    }

    const usuario = {
      nome: nomeInput.value.trim(),
      email: emailInput.value.trim(),
      senha: senhaInput.value,
    };

    localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));

    showMessage("Conta criada com sucesso!", "success");

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1500);
  });
});
