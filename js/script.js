const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

const form = document.querySelector("#form-tarefas");
const input = document.querySelector("#input-tarefa");
const lista = document.querySelector("#lista-tarefas");
const mensagemErro = document.querySelector("#mensagem-erro");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const texto = input.value;
    if (!validarTarefa(texto)) return;
    tarefas.push(texto.trim());
    salvarTarefas();
    input.value = "";
    renderTarefas();
});

function validarTarefa(texto) {
    if (texto.trim() === "") {
        setError("Digite uma tarefa válida!");
        return false;
    }
    clearError();
    return true;
}

function renderTarefas() {
    lista.innerHTML = "";

    if (tarefas.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Nenhuma tarefa adicionada.";
        li.classList.add("lista-vazia");
        lista.appendChild(li);
        return;
    }

    tarefas.forEach(function(tarefa, index) {
        const li = document.createElement("li");
        li.classList.add("tarefa-item");

        const span = document.createElement("span");
        span.textContent = tarefa;

        const inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.value = tarefa;
        inputEdit.classList.add("input-edicao");
        inputEdit.style.display = "none";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("btn-editar");

        const btnSalvar = document.createElement("button");
        btnSalvar.textContent = "Salvar";
        btnSalvar.classList.add("btn-salvar");
        btnSalvar.style.display = "none";

        const btnCancelar = document.createElement("button");
        btnCancelar.textContent = "Cancelar";
        btnCancelar.classList.add("btn-cancelar");
        btnCancelar.style.display = "none";

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("btn-excluir");
        btnExcluir.setAttribute("aria-label", `Excluir tarefa: ${tarefa}`);

        function entrarEdicao() {
            span.style.display = "none";
            inputEdit.style.display = "block";
            btnEditar.style.display = "none";
            btnExcluir.style.display = "none";
            btnSalvar.style.display = "inline-block";
            btnCancelar.style.display = "inline-block";
            inputEdit.focus();
            inputEdit.select();
        }

        function salvar() {
            const novo = inputEdit.value.trim();
            if (!novo) {
                inputEdit.classList.add("input-error");
                inputEdit.focus();
                return;
            }
            tarefas[index] = novo;
            salvarTarefas();
            renderTarefas();
        }

        function cancelar() {
            renderTarefas();
        }

        btnEditar.addEventListener("click", entrarEdicao);
        btnSalvar.addEventListener("click", salvar);
        btnCancelar.addEventListener("click", cancelar);
        btnExcluir.addEventListener("click", () => excluirTarefa(index));

        inputEdit.addEventListener("keydown", function(e) {
            if (e.key === "Enter") salvar();
            if (e.key === "Escape") cancelar();
        });

        li.appendChild(span);
        li.appendChild(inputEdit);
        li.appendChild(btnEditar);
        li.appendChild(btnSalvar);
        li.appendChild(btnCancelar);
        li.appendChild(btnExcluir);
        lista.appendChild(li);
    });
}

function excluirTarefa(index) {
    tarefas.splice(index, 1);
    salvarTarefas();
    renderTarefas();
}

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function setError(msg) {
    mensagemErro.textContent = msg;
    mensagemErro.classList.add("mensagem-erro");
    input.classList.add("input-error");
    input.setAttribute("aria-invalid", "true");
    input.focus();
}

function clearError() {
    mensagemErro.textContent = "";
    mensagemErro.classList.remove("mensagem-erro");
    input.classList.remove("input-error");
    input.removeAttribute("aria-invalid");
}