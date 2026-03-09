// CARREGAR USUÁRIO

function carregarDadosUsuario() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (usuario) {
    document.getElementById("profileNome").textContent = usuario.nome;
    document.getElementById("profileEmail").textContent = usuario.email;
  } else {
    window.location.href = "../index.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarDadosUsuario();
  carregarTarefas();
  atualizarStats();
});

// LOCAL STORAGE TAREFAS

function obterTarefas() {
  return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// ATUALIZAR CARDS

function atualizarStats() {
  const tarefas = obterTarefas();

  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.status === "concluida").length;
  const progresso = tarefas.filter((t) => t.status === "em-andamento").length;
  const pendentes = tarefas.filter((t) => t.status === "pendente").length;

  const cards = document.querySelectorAll(".stat-number");

  if (cards.length >= 4) {
    cards[0].textContent = total;
    cards[1].textContent = concluidas;
    cards[2].textContent = progresso;
    cards[3].textContent = pendentes;
  }
}

// RENDER TAREFAS

function carregarTarefas() {
  const tarefas = obterTarefas();

  const emptyState = document.querySelector(".tasks-empty-state");
  const section = document.querySelector(".tasks-section");
  const listaExistente = document.querySelector(".tasks-list");

  if (listaExistente) {
    listaExistente.remove();
  }

  if (tarefas.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  const lista = document.createElement("div");
  lista.className = "tasks-list";

  tarefas.forEach((tarefa) => {
    const card = document.createElement("div");
    card.className = "task-card";

    card.innerHTML = `
      <h3>${tarefa.titulo}</h3>
      <p>${tarefa.descricao}</p>

      <div class="task-meta">
        <span>📁 ${tarefa.categoria}</span>
        <span>⚡ ${tarefa.prioridade}</span>
        <span>📅 ${tarefa.data}</span>
        <span>📌 ${tarefa.status}</span>
      </div>
    `;

    lista.appendChild(card);
  });

  section.appendChild(lista);
}

// MODAL PERFIL

const openPerfilBtn = document.getElementById("openPerfilModal");
const perfilModal = document.getElementById("perfilModal");
const closePerfilBtn = document.getElementById("closeModal");

if (openPerfilBtn) {
  openPerfilBtn.addEventListener("click", function (e) {
    e.preventDefault();
    carregarDadosUsuario();
    perfilModal.classList.add("active");
  });
}

if (closePerfilBtn) {
  closePerfilBtn.addEventListener("click", function () {
    perfilModal.classList.remove("active");
  });
}

if (perfilModal) {
  perfilModal.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("active");
    }
  });
}

// MODAL NOVA TAREFA

const openTarefaBtn = document.getElementById("openNovaTarefaModal");
const tarefaModal = document.getElementById("novaTarefaModal");
const closeTarefaBtn = document.getElementById("closeTarefaModal");
const cancelarTarefaBtn = document.getElementById("cancelarTarefa");
const formTarefa = document.getElementById("formNovaTarefa");

if (openTarefaBtn) {
  openTarefaBtn.addEventListener("click", function (e) {
    e.preventDefault();
    tarefaModal.classList.add("active");
  });
}

if (closeTarefaBtn) {
  closeTarefaBtn.addEventListener("click", function () {
    tarefaModal.classList.remove("active");
  });
}

if (cancelarTarefaBtn) {
  cancelarTarefaBtn.addEventListener("click", function () {
    tarefaModal.classList.remove("active");
    if (formTarefa) formTarefa.reset();
    limparErros();
  });
}

if (tarefaModal) {
  tarefaModal.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("active");
    }
  });
}

// VALIDAÇÃO DO FORMULÁRIO

function limparErros() {
  document.querySelectorAll(".input-error").forEach((el) => {
    el.textContent = "";
  });
}

function validarFormulario() {
  limparErros();

  let valido = true;

  const titulo = document.getElementById("tituloTarefa").value.trim();
  const descricao = document.getElementById("descricaoTarefa").value.trim();
  const categoria = document.getElementById("categoriaTarefa").value.trim();
  const prioridade = document.getElementById("prioridadeTarefa").value;
  const status = document.getElementById("statusTarefa").value;
  const data = document.getElementById("dataTarefa").value;

  if (!titulo) {
    document.getElementById("tituloError").textContent =
      "Informe o título da tarefa";
    valido = false;
  }

  if (!descricao) {
    document.getElementById("descricaoError").textContent =
      "Informe a descrição";
    valido = false;
  }

  if (!categoria) {
    document.getElementById("categoriaError").textContent =
      "Informe a categoria";
    valido = false;
  }

  if (!prioridade) {
    document.getElementById("prioridadeError").textContent =
      "Selecione uma prioridade";
    valido = false;
  }

  if (!status) {
    document.getElementById("statusError").textContent = "Selecione um status";
    valido = false;
  }

  if (!data) {
    document.getElementById("dataError").textContent =
      "Informe a data de prazo";
    valido = false;
  }

  return valido;
}

// CRIAR TAREFA

if (formTarefa) {
  formTarefa.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarFormulario()) return;

    const novaTarefa = {
      id: Date.now(),
      titulo: document.getElementById("tituloTarefa").value.trim(),
      descricao: document.getElementById("descricaoTarefa").value.trim(),
      categoria: document.getElementById("categoriaTarefa").value.trim(),
      prioridade: document.getElementById("prioridadeTarefa").value,
      status: document.getElementById("statusTarefa").value,
      data: document.getElementById("dataTarefa").value,
    };

    const tarefas = obterTarefas();

    tarefas.push(novaTarefa);

    salvarTarefas(tarefas);

    formTarefa.reset();

    tarefaModal.classList.remove("active");

    carregarTarefas();
    atualizarStats();
  });
}

// LOGOUT

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("usuarioLogado");

      window.location.href = "../index.html";
    }
  });
}

// BOTÕES PERFIL

document
  .querySelectorAll(".btn-save, .btn-security, .btn-danger")
  .forEach((btn) => {
    btn.addEventListener("click", function () {
      alert("Funcionalidade em desenvolvimento");
    });
  });
