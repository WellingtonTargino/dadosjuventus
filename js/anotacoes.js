document.addEventListener("DOMContentLoaded", function() {
    const anotacaoGeralForm = document.getElementById("anotacaoGeralForm");
    const listaAnotacoesGerais = document.getElementById("listaAnotacoesGerais");

    let anotacoesGerais = JSON.parse(localStorage.getItem("anotacoesGerais")) || [];

    function renderizarAnotacoesGerais() {
        listaAnotacoesGerais.innerHTML = "";
        anotacoesGerais.forEach((anotacao, index) => {
            const anotacaoBloco = document.createElement("div");
            anotacaoBloco.className = "anotacao-bloco";
            anotacaoBloco.innerHTML = `
                <p>${anotacao}</p>
                <div>
                    <button class="botao-editar" data-index="${index}">Editar</button>
                    <button class="botao-excluir" data-index="${index}">Excluir</button>
                </div>
            `;
            listaAnotacoesGerais.appendChild(anotacaoBloco);
        });

        document.querySelectorAll(".botao-editar").forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                editarAnotacaoGeral(index);
            });
        });

        document.querySelectorAll(".botao-excluir").forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                excluirAnotacaoGeral(index);
            });
        });
    }

    function editarAnotacaoGeral(index) {
        const anotacao = anotacoesGerais[index];
        const novaAnotacao = prompt("Editar anotação:", anotacao);
        if (novaAnotacao !== null && novaAnotacao.trim() !== "") {
            anotacoesGerais[index] = novaAnotacao.trim();
            localStorage.setItem("anotacoesGerais", JSON.stringify(anotacoesGerais));
            renderizarAnotacoesGerais();
        }
    }

    function excluirAnotacaoGeral(index) {
        if (confirm("Tem certeza que deseja excluir esta anotação?")) {
            anotacoesGerais.splice(index, 1);
            localStorage.setItem("anotacoesGerais", JSON.stringify(anotacoesGerais));
            renderizarAnotacoesGerais();
        }
    }

    anotacaoGeralForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const novaAnotacao = document.getElementById("anotacaoGeral").value.trim();
        if (novaAnotacao !== "") {
            anotacoesGerais.push(novaAnotacao);
            localStorage.setItem("anotacoesGerais", JSON.stringify(anotacoesGerais));
            document.getElementById("anotacaoGeral").value = "";
            renderizarAnotacoesGerais();
        }
    });

    renderizarAnotacoesGerais();
});
