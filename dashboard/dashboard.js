// ===== CARREGAR USUÁRIO =====
function carregarDadosUsuario() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (usuario) {
    document.getElementById("profileNome").textContent = usuario.nome;
    document.getElementById("profileEmail").textContent = usuario.email;
  } else {
    window.location.href = "../login/index.html";
  }
}

// ===== VARIÁVEL DE FILTRO GLOBAL =====
let filtroAtual = "todas"; // 'todas', 'concluida', 'em-andamento', 'pendente'

// ===== LOCAL STORAGE TAREFAS =====
function obterTarefas() {
  return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// ===== ATUALIZAR CARDS DE ESTATÍSTICAS =====
function atualizarStats() {
  const tarefas = obterTarefas();
  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.status === "concluida").length;
  const pendentes = tarefas.filter((t) => t.status === "pendente").length;

  const cards = document.querySelectorAll(".stat-number");
  if (cards.length >= 3) {
    cards[0].textContent = total; // cardTotal
    cards[1].textContent = concluidas; // cardConcluidas
    cards[2].textContent = pendentes; // cardPendentes
  }
}

// ===== RENDERIZAR TAREFAS COM FILTRO =====
function carregarTarefas(filtro) {
  const tarefas = obterTarefas();
  let tarefasFiltradas;

  switch (filtro) {
    case "concluida":
      tarefasFiltradas = tarefas.filter((t) => t.status === "concluida");
      document.getElementById("filtroDescricao").textContent =
        "Tarefas concluídas";
      break;
    case "em-andamento":
      tarefasFiltradas = tarefas.filter((t) => t.status === "em-andamento");
      document.getElementById("filtroDescricao").textContent =
        "Tarefas em andamento";
      break;
    case "pendente":
      tarefasFiltradas = tarefas.filter((t) => t.status === "pendente");
      document.getElementById("filtroDescricao").textContent =
        "Tarefas pendentes";
      break;
    default:
      tarefasFiltradas = tarefas;
      document.getElementById("filtroDescricao").textContent =
        "Todas as tarefas";
  }

  const emptyState = document.querySelector(".tasks-empty-state");
  const section = document.querySelector(".tasks-section");
  const listaExistente = document.querySelector(".tasks-list");
  if (listaExistente) listaExistente.remove();

  if (tarefasFiltradas.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  const lista = document.createElement("div");
  lista.className = "tasks-list";

  tarefasFiltradas.forEach((tarefa) => {
    const card = document.createElement("div");
    card.className = `task-card prioridade-${tarefa.prioridade}`;

    // Botão "Concluir" apenas se não estiver concluída
    let botaoConcluir = "";
    if (tarefa.status !== "concluida") {
      botaoConcluir = `<button class="btn-concluir" onclick="concluirTarefa('${tarefa.id}')">✅ Concluir</button>`;
    }

    card.innerHTML = `
      <h3>${tarefa.titulo}</h3>
      <p>${tarefa.descricao}</p>
      <div class="task-meta">
        <span class="meta-categoria">📁 ${tarefa.categoria}</span>
        <span class="meta-prioridade">⚡ ${tarefa.prioridade}</span>
        <span class="meta-data">📅 ${tarefa.data}</span>
        <span class="meta-status status-${tarefa.status}">📌 ${tarefa.status}</span>
      </div>
      <div class="task-actions">
        ${botaoConcluir}
      </div>
    `;
    lista.appendChild(card);
  });

  section.appendChild(lista);
}

// ===== CONCLUIR TAREFA =====
function concluirTarefa(id) {
  const tarefas = obterTarefas();
  const tarefa = tarefas.find((t) => String(t.id) === String(id));
  if (!tarefa) return;

  tarefa.status = "concluida";
  salvarTarefas(tarefas);
  carregarTarefas(filtroAtual);
  atualizarStats();
}

// ===== CONFIGURA FILTROS NOS CARDS =====
function iniciarFiltros() {
  const cardTotal = document.getElementById("cardTotal");
  const cardConcluidas = document.getElementById("cardConcluidas");
  const cardPendentes = document.getElementById("cardPendentes");

  cardTotal.addEventListener("click", () => {
    filtroAtual = "todas";
    carregarTarefas("todas");
    setActiveCard("cardTotal");
  });

  cardConcluidas.addEventListener("click", () => {
    filtroAtual = "concluida";
    carregarTarefas("concluida");
    setActiveCard("cardConcluidas");
  });

  cardPendentes.addEventListener("click", () => {
    filtroAtual = "pendente";
    carregarTarefas("pendente");
    setActiveCard("cardPendentes");
  });

  setActiveCard("cardTotal");
}

function setActiveCard(id) {
  document
    .querySelectorAll(".stat-card")
    .forEach((card) => card.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");
}

// ===== MODAL PERFIL =====
const openPerfilBtn = document.getElementById("openPerfilModal");
const perfilModal = document.getElementById("perfilModal");
const closePerfilBtn = document.getElementById("closeModal");

openPerfilBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  carregarDadosUsuario();
  perfilModal.classList.add("active");
});

closePerfilBtn?.addEventListener("click", () =>
  perfilModal.classList.remove("active"),
);
perfilModal?.addEventListener("click", (e) => {
  if (e.target === perfilModal) perfilModal.classList.remove("active");
});

// ===== MODAL NOVA TAREFA =====
const openTarefaBtn = document.getElementById("openNovaTarefaModal");
const tarefaModal = document.getElementById("novaTarefaModal");
const closeTarefaBtn = document.getElementById("closeTarefaModal");
const cancelarTarefaBtn = document.getElementById("cancelarTarefa");
const formTarefa = document.getElementById("formNovaTarefa");

openTarefaBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  tarefaModal.classList.add("active");
});

closeTarefaBtn?.addEventListener("click", () => {
  tarefaModal.classList.remove("active");
  formTarefa?.reset();
  limparErros();
});

cancelarTarefaBtn?.addEventListener("click", () => {
  tarefaModal.classList.remove("active");
  formTarefa?.reset();
  limparErros();
});

tarefaModal?.addEventListener("click", (e) => {
  if (e.target === tarefaModal) {
    tarefaModal.classList.remove("active");
    formTarefa?.reset();
    limparErros();
  }
});

// ===== VALIDAÇÃO DO FORMULÁRIO =====
function limparErros() {
  document
    .querySelectorAll(".input-error")
    .forEach((el) => (el.textContent = ""));
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
    document.getElementById("tituloError").textContent = "Informe o título";
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
    document.getElementById("dataError").textContent = "Informe a data";
    valido = false;
  }

  return valido;
}

// ===== CRIAR TAREFA =====
formTarefa?.addEventListener("submit", (e) => {
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
  carregarTarefas(filtroAtual);
  atualizarStats();
});

// ===== LOGOUT =====
document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("Tem certeza que deseja sair?")) {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "../home.html";
  }
});

// ===== BOTÕES DO PERFIL (EM DESENVOLVIMENTO) =====
document
  .querySelectorAll(".btn-save, .btn-security, .btn-danger")
  .forEach((btn) => {
    btn.addEventListener("click", () =>
      alert("Funcionalidade em desenvolvimento"),
    );
  });

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  carregarDadosUsuario();
  atualizarStats();
  iniciarFiltros();
  carregarTarefas("todas"); // Inicia mostrando todas
});
