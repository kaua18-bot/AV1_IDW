const tarefas = [];

const form = document.querySelector("#form-tarefas");
const input = document.querySelector("#input-tarefa");
const lista = document.querySelector("#lista-tarefas");
const mensagemErro = document.querySelector("#mensagem-erro");
const contador = document.querySelector("#contador");
const numTarefas = document.querySelector("#num-tarefas");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const texto = input.value.trim();

    if (texto === "") {
        mensagemErro.textContent = "Digite uma tarefa!";
        return;
    }

    mensagemErro.textContent = "";
    tarefas.push(texto);
    input.value = "";

    renderTarefas();
});

function renderTarefas() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");
        li.classList.add("tarefa-item");

        const span = document.createElement("span");
        span.textContent = tarefa;

        const btn = document.createElement("button");
        btn.textContent = "Excluir";

        btn.addEventListener("click", () => {
            tarefas.splice(index, 1);
            renderTarefas();
        });

        li.appendChild(span);
        li.appendChild(btn);

        lista.appendChild(li);
    });

    numTarefas.textContent = tarefas.length;
}