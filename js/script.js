const tarefas = [];
const form = document.querySelector("#form-tarefas");
const input = document.querySelector("#input-tarefa");
const lista = document.querySelector("#lista-tarefas");
const mensagemErro = document.querySelector("#mensagem-erro");
const contador = document.querySelector("#contador");
const numTarefas = document.querySelector("#num-tarefas");
 
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const texto = input.value;
    if (!validarTarefa(texto)) return;
    tarefas.push(texto.trim());
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
        contador.style.display = "none";
        return;
    }
 
    tarefas.forEach(function(tarefa, index) {
        const li = document.createElement("li");
        li.classList.add("tarefa-item");
 
        // --- Linha de visualização ---
        const viewRow = document.createElement("div");
        viewRow.style.cssText = "display:flex; align-items:center; justify-content:space-between; width:100%;";
 
        const span = document.createElement("span");
        span.textContent = tarefa;
 
        const acoes = document.createElement("div");
        acoes.classList.add("acoes");
 
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("btn-editar");
        btnEditar.setAttribute("aria-label", `Editar tarefa: ${tarefa}`);
 
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("btn-excluir");
        btnExcluir.setAttribute("aria-label", `Excluir tarefa: ${tarefa}`);
 
        // --- Linha de edição ---
        const editRow = document.createElement("div");
        editRow.classList.add("edit-row");
        editRow.style.display = "none";
 
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.classList.add("edit-input");
        editInput.value = tarefa;
 
        const btnSalvar = document.createElement("button");
        btnSalvar.textContent = "Salvar";
        btnSalvar.classList.add("btn-salvar");
 
        const btnCancelar = document.createElement("button");
        btnCancelar.textContent = "Cancelar";
        btnCancelar.classList.add("btn-cancelar");
 
        // Eventos
        btnEditar.addEventListener("click", function() {
            li.classList.add("editando");
            viewRow.style.display = "none";
            editRow.style.display = "flex";
            editInput.focus();
            editInput.select();
        });
 
        btnCancelar.addEventListener("click", function() {
            li.classList.remove("editando");
            viewRow.style.display = "flex";
            editRow.style.display = "none";
            editInput.value = tarefas[index];
        });
 
        btnSalvar.addEventListener("click", function() {
            const novoTexto = editInput.value.trim();
            if (novoTexto === "") {
                editInput.style.borderColor = "#ff5252";
                editInput.focus();
                return;
            }
            tarefas[index] = novoTexto;
            renderTarefas();
        });
 
        editInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") btnSalvar.click();
            if (e.key === "Escape") btnCancelar.click();
        });
 
        btnExcluir.addEventListener("click", function() {
            tarefas.splice(index, 1);
            renderTarefas();
        });
 
        // Montagem
        acoes.appendChild(btnEditar);
        acoes.appendChild(btnExcluir);
        viewRow.appendChild(span);
        viewRow.appendChild(acoes);
        editRow.appendChild(editInput);
        editRow.appendChild(btnSalvar);
        editRow.appendChild(btnCancelar);
        li.appendChild(viewRow);
        li.appendChild(editRow);
        lista.appendChild(li);
    });
 
    numTarefas.textContent = tarefas.length;
    contador.style.display = "block";
}
 
function setError(msg) {
    mensagemErro.textContent = msg;
    input.classList.add("input-error");
    input.setAttribute("aria-invalid", "true");
    input.focus();
}
 
function clearError() {
    mensagemErro.textContent = "";
    input.classList.remove("input-error");
    input.removeAttribute("aria-invalid");
}
 
renderTarefas();