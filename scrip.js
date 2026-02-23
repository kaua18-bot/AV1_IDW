// Array que armazena as tarefas
const tarefas = [];

const form = document.querySelector("#form-tarefas");
const input = document.querySelector("#input-tarefa");
const lista = document.querySelector("#lista-tarefas");
const mensagemErro = document.querySelector("#mensagem-erro");

// Evento de envio do formulário
form.addEventListener("submit", function(event) {
    event.preventDefault(); // impede a página de recarregar

    const texto = input.value;

    if (!validarTarefa(texto)) {
        return; // para o código se for inválido
    }

    tarefas.push(texto.trim()); // adiciona no array
    input.value = ""; // limpa o campo

    renderTarefas(); // atualiza a tela
});


// Função de validação
function validarTarefa(texto) {
    if (texto.trim() === "") {
        mensagemErro.textContent = "Digite uma tarefa válida!";
        return false;
    }

    mensagemErro.textContent = ""; // limpa erro se estiver certo
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