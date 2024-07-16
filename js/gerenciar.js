document.addEventListener("DOMContentLoaded", function() {
    const listaAlunos = document.getElementById("listaAlunos");
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    function renderizarAlunos() {
        listaAlunos.innerHTML = "";
        alunos.forEach((aluno, index) => {
            const alunoBloco = document.createElement("div");
            alunoBloco.className = "aluno-bloco";
            alunoBloco.innerHTML = `
                <p>${aluno.nomeCompleto}</p>
                <div>
                    <button class="botao-editar" data-index="${index}">Editar</button>
                    <button class="botao-excluir" data-index="${index}">Excluir</button>
                </div>
            `;
            listaAlunos.appendChild(alunoBloco);
        });

        document.querySelectorAll(".botao-editar").forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                editarAluno(index);
            });
        });

        document.querySelectorAll(".botao-excluir").forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                excluirAluno(index);
            });
        });
    }

    function editarAluno(index) {
        const aluno = alunos[index];
        const formHTML = `
            <form id="editarForm">
                <label for="nomeCompleto">Nome Completo:</label>
                <input type="text" id="nomeCompleto" name="nomeCompleto" value="${aluno.nomeCompleto}" required>
                <label for="dataNascimento">Data de Nascimento:</label>
                <input type="date" id="dataNascimento" name="dataNascimento" value="${aluno.dataNascimento}" >
                <label for="telefone">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" value="${aluno.telefone}" >
                <label for="nomeMae">Nome da Mãe:</label>
                <input type="text" id="nomeMae" name="nomeMae" value="${aluno.nomeMae}" >
                <label for="telefoneMae">Telefone da Mãe:</label>
                <input type="tel" id="telefoneMae" name="telefoneMae" value="${aluno.telefoneMae}" >
                <label for="nomePai">Nome do Pai:</label>
                <input type="text" id="nomePai" name="nomePai" value="${aluno.nomePai}" >
                <label for="telefonePai">Telefone do Pai:</label>
                <input type="tel" id="telefonePai" name="telefonePai" value="${aluno.telefonePai}" >
                <label for="departamentos">Departamentos:</label>
                <input type="text" id="departamentos" name="departamentos" value="${aluno.departamentos.join(', ')}" >
                <label for="habilidades">Habilidades:</label>
                <input type="text" id="habilidades" name="habilidades" value="${aluno.habilidades.join(', ')}" >
                <label for="alergias">Alergias:</label>
                <input type="text" id="alergias" name="alergias" value="${aluno.alergias.join(', ')}" >
                <label for="deficiencias">Deficiências:</label>
                <input type="text" id="deficiencias" name="deficiencias" value="${aluno.deficiencias.join(', ')}" >
                <label for="gostoMusical">Gosto Musical:</label>
                <input type="text" id="gostoMusical" name="gostoMusical" value="${aluno.gostoMusical.join(', ')}" >
                <label for="tempoConosco">Tempo que está conosco:</label>
                <input type="text" id="tempoConosco" name="tempoConosco" value="${aluno.tempoConosco}" >
                <label for="sedeOuCongregacao">Sede ou Congregação:</label>
                <input type="text" id="sedeOuCongregacao" name="sedeOuCongregacao" value="${aluno.sedeOuCongregacao}" >
                <label for="convertido">Convertido:</label>
                <input type="text" id="convertido" name="convertido" value="${aluno.convertido}" >
                <label for="batizado">Batizado:</label>
                <input type="text" id="batizado" name="batizado" value="${aluno.batizado}" >
                <label for="genero">Gênero:</label>
                <input type="text" id="genero" name="genero" value="${aluno.genero}" >
                <label for="paisIgreja">Pais na Igreja:</label>
                <input type="text" id="paisIgreja" name="paisIgreja" value="${aluno.paisIgreja}" >
                <button type="submit">Salvar</button>
            </form>
        `;

        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                ${formHTML}
            </div>
        `;

        document.body.appendChild(modal);

        const form = document.getElementById("editarForm");
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const updatedAluno = {};
            formData.forEach((value, key) => {
                updatedAluno[key] = value;
            });

            updatedAluno.departamentos = updatedAluno.departamentos.split(',').map(item => item.trim());
            updatedAluno.habilidades = updatedAluno.habilidades.split(',').map(item => item.trim());
            updatedAluno.alergias = updatedAluno.alergias.split(',').map(item => item.trim());
            updatedAluno.deficiencias = updatedAluno.deficiencias.split(',').map(item => item.trim());
            updatedAluno.gostoMusical = updatedAluno.gostoMusical.split(',').map(item => item.trim());

            alunos[index] = updatedAluno;
            localStorage.setItem("alunos", JSON.stringify(alunos));
            document.body.removeChild(modal);
            renderizarAlunos();
        });

        modal.querySelector(".close").addEventListener("click", function() {
            document.body.removeChild(modal);
        });
    }

    function excluirAluno(index) {
        if (confirm("Tem certeza que deseja excluir este Jovem?")) {
            alunos.splice(index, 1);
            localStorage.setItem("alunos", JSON.stringify(alunos));
            renderizarAlunos();
        }
    }

    renderizarAlunos();
});
