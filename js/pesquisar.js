document.addEventListener("DOMContentLoaded", function() {
    const filtroForm = document.getElementById("filtroForm");
    const resultadosLista = document.getElementById("resultadosLista");

    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    function renderResultados(resultados) {
        resultadosLista.innerHTML = "";
        resultados.forEach(aluno => {
            const alunoDiv = document.createElement("div");
            alunoDiv.className = "aluno";
            alunoDiv.innerHTML = `
                <p>Nome Completo: <a href="#">${aluno.nomeCompleto}</a></p>
                <div class="aluno-detalhes" style="display:none;">
                    <p>Data de Nascimento: ${aluno.dataNascimento}</p>
                    <p>Telefone: ${aluno.telefone}</p>
                    <p>Nome da Mãe: ${aluno.nomeMae}</p>
                    <p>Telefone da Mãe: ${aluno.telefoneMae}</p>
                    <p>Nome do Pai: ${aluno.nomePai}</p>
                    <p>Telefone do Pai: ${aluno.telefonePai}</p>
                    <p>Departamentos: ${aluno.departamentos.join(', ')}</p>
                    <p>Habilidades: ${aluno.habilidades.join(', ')}</p>
                    <p>Alergias: ${aluno.alergias.join(', ')}</p>
                    <p>Deficiências: ${aluno.deficiencias.join(', ')}</p>
                    <p>Gosto Musical: ${aluno.gostoMusical.join(', ')}</p>
                    <p>Tempo que está conosco: ${aluno.tempoConosco}</p>
                    <p>Sede ou Congregação: ${aluno.sedeOuCongregacao}</p>
                    <p>Convertido: ${aluno.convertido}</p>
                    <p>Batizado: ${aluno.batizado}</p>
                    <p>Gênero: ${aluno.genero}</p>
                    <p>Pais na Igreja: ${aluno.paisIgreja}</p>
                </div>
            `;
            alunoDiv.querySelector("a").addEventListener("click", function() {
                const detalhes = alunoDiv.querySelector(".aluno-detalhes");
                detalhes.style.display = detalhes.style.display === "none" ? "block" : "none";
            });
            resultadosLista.appendChild(alunoDiv);
        });
    }

    filtroForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const filtroCampo = document.getElementById("filtroCampo").value;
        const filtroValor = document.getElementById("filtroValor").value.trim().toLowerCase();

        const resultados = alunos.filter(aluno => {
            if (Array.isArray(aluno[filtroCampo])) {
                return aluno[filtroCampo].map(item => item.toLowerCase()).includes(filtroValor);
            } else {
                return aluno[filtroCampo].toLowerCase().includes(filtroValor);
            }
        });

        renderResultados(resultados);
    });
});
