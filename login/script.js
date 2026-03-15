document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");

  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  const messageDiv = document.getElementById("message");

  function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = "block";

    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 3000);
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function isValidPassword(password) {
    return password.length >= 6;
  }

  function validateEmail() {
    const email = emailInput.value.trim();

    if (!email) {
      emailError.textContent = "Digite seu e-mail";
      return false;
    }

    if (!isValidEmail(email)) {
      emailError.textContent = "E-mail inválido";
      return false;
    }

    emailError.textContent = "";
    return true;
  }

  function validatePassword() {
    const password = passwordInput.value;

    if (!password) {
      passwordError.textContent = "Digite sua senha";
      return false;
    }

    if (!isValidPassword(password)) {
      passwordError.textContent = "A senha precisa ter pelo menos 6 caracteres";
      return false;
    }

    passwordError.textContent = "";
    return true;
  }

  emailInput.addEventListener("input", validateEmail);

  passwordInput.addEventListener("input", validatePassword);

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailValid = validateEmail();
    const passwordValid = validatePassword();

    if (!emailValid || !passwordValid) {
      showMessage("Corrija os erros no formulário", "error");
      return;
    }

    const email = emailInput.value.trim();

    const nome = email.split("@")[0];

    localStorage.setItem("usuarioLogado", JSON.stringify({ nome, email }));

    showMessage("Login realizado com sucesso", "success");

    setTimeout(() => {
      window.location.href = "../dashboard/dashboard.html";
    }, 1500);
  });

  const logoImg = document.querySelector(".logo img");

  if (logoImg) {
    logoImg.onerror = () => {
      logoImg.style.display = "none";

      const logoContainer = document.querySelector(".logo");
      logoContainer.innerHTML = "🐺";
    };
  }
});
