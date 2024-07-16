document.addEventListener("DOMContentLoaded", function() {
    const anotacaoEspecificaForm = document.getElementById("anotacaoEspecificaForm");
    const listaAnotacoesEspecificas = document.getElementById("listaAnotacoesEspecificas");
    const nomeAlunoSelect = document.getElementById("nomeAluno");

    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    let anotacoesEspecificas = JSON.parse(localStorage.getItem("anotacoesEspecificas")) || {};

    function renderizarNomesAlunos() {
        nomeAlunoSelect.innerHTML = "";
        alunos.forEach(aluno => {
            const option = document.createElement("option");
            option.value = aluno.nomeCompleto;
            option.textContent = aluno.nomeCompleto;
            nomeAlunoSelect.appendChild(option);
        });
    }

    function renderizarAnotacoesEspecificas() {
        listaAnotacoesEspecificas.innerHTML = "";
        for (let nome in anotacoesEspecificas) {
            const anotacoes = anotacoesEspecificas[nome];
            const alunoDiv = document.createElement("div");
            alunoDiv.className = "anotacoes-aluno";
            alunoDiv.innerHTML = `<h3>${nome}</h3>`;
            anotacoes.forEach((anotacao, index) => {
                const anotacaoDiv = document.createElement("div");
                anotacaoDiv.className = "anotacao-bloco";
                anotacaoDiv.innerHTML = `
                    <p>${anotacao}</p>
                    <div>
                        <button class="botao-editar" data-nome="${nome}" data-index="${index}">Editar</button>
                        <button class="botao-excluir" data-nome="${nome}" data-index="${index}">Excluir</button>
                    </div>
                `;
                alunoDiv.appendChild(anotacaoDiv);
            });
            listaAnotacoesEspecificas.appendChild(alunoDiv);
        }

        document.querySelectorAll(".botao-editar").forEach(button => {
            button.addEventListener("click", function() {
                const nome = this.getAttribute("data-nome");
                const index = this.getAttribute("data-index");
                editarAnotacaoEspecifica(nome, index);
            });
        });

        document.querySelectorAll(".botao-excluir").forEach(button => {
            button.addEventListener("click", function() {
                const nome = this.getAttribute("data-nome");
                const index = this.getAttribute("data-index");
                excluirAnotacaoEspecifica(nome, index);
            });
        });
    }

    function editarAnotacaoEspecifica(nome, index) {
        const anotacao = anotacoesEspecificas[nome][index];
        const novaAnotacao = prompt("Editar anotação:", anotacao);
        if (novaAnotacao !== null && novaAnotacao.trim() !== "") {
            anotacoesEspecificas[nome][index] = novaAnotacao.trim();
            localStorage.setItem("anotacoesEspecificas", JSON.stringify(anotacoesEspecificas));
            renderizarAnotacoesEspecificas();
        }
    }

    function excluirAnotacaoEspecifica(nome, index) {
        if (confirm("Tem certeza que deseja excluir esta anotação?")) {
            anotacoesEspecificas[nome].splice(index, 1);
            if (anotacoesEspecificas[nome].length === 0) {
                delete anotacoesEspecificas[nome];
            }
            localStorage.setItem("anotacoesEspecificas", JSON.stringify(anotacoesEspecificas));
            renderizarAnotacoesEspecificas();
        }
    }

    anotacaoEspecificaForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const nomeAluno = document.getElementById("nomeAluno").value;
        const novaAnotacao = document.getElementById("anotacaoEspecifica").value.trim();
        if (novaAnotacao !== "") {
            if (!anotacoesEspecificas[nomeAluno]) {
                anotacoesEspecificas[nomeAluno] = [];
            }
            anotacoesEspecificas[nomeAluno].push(novaAnotacao);
            localStorage.setItem("anotacoesEspecificas", JSON.stringify(anotacoesEspecificas));
            document.getElementById("anotacaoEspecifica").value = "";
            renderizarAnotacoesEspecificas();
        }
    });

    renderizarNomesAlunos();
    renderizarAnotacoesEspecificas();
});
