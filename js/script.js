// Array que armazena as tarefas
const tarefas = [];

// Seletores do DOM
const form = document.querySelector("#form-tarefas");
const input = document.querySelector("#input-tarefa");
const lista = document.querySelector("#lista-tarefas");
const mensagemErro = document.querySelector("#mensagem-erro");

// Evento de envio do formulário
form.addEventListener("submit", function(event) {
    event.preventDefault(); // impede a página de recarregar

    const texto = input.value;

    if (!validarTarefa(texto)) {
        return; // não adiciona se inválido
    }

    tarefas.push(texto.trim()); // adiciona a tarefa ao array
    input.value = ""; // limpa o campo

    renderTarefas(); // atualiza a lista na tela
});

// Função de validação: impede tarefa vazia
function validarTarefa(texto) {
    if (texto.trim() === "") {
        mensagemErro.textContent = "Digite uma tarefa válida!";
        return false;
    }

    mensagemErro.textContent = ""; // limpa mensagem de erro
    return true;
}

// Função que atualiza a lista na tela
function renderTarefas() {
    lista.innerHTML = ""; // limpa lista antes de renderizar

    tarefas.forEach(function (tarefa) {
        const li = document.createElement("li");
        li.textContent = tarefa;
        lista.appendChild(li);
    });
}
