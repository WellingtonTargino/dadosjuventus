document.addEventListener("DOMContentLoaded", function() {
    const alunoForm = document.getElementById("alunoForm");
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    alunoForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const novoAluno = {
            nomeCompleto: document.getElementById("nomeCompleto").value,
            dataNascimento: document.getElementById("dataNascimento").value,
            telefone: document.getElementById("telefone").value,
            nomeMae: document.getElementById("nomeMae").value,
            telefoneMae: document.getElementById("telefoneMae").value,
            nomePai: document.getElementById("nomePai").value,
            telefonePai: document.getElementById("telefonePai").value,
            departamentos: document.getElementById("departamentos").value.split(','),
            habilidades: document.getElementById("habilidades").value.split(','),
            alergias: document.getElementById("alergias").value.split(','),
            deficiencias: document.getElementById("deficiencias").value.split(','),
            gostoMusical: document.getElementById("gostoMusical").value.split(','),
            tempoConosco: document.getElementById("tempoConosco").value,
            sedeOuCongregacao: document.getElementById("sedeOuCongregacao").value,
            convertido: document.getElementById("convertido").value,
            batizado: document.getElementById("batizado").value,
            genero: document.getElementById("genero").value,
            paisIgreja: document.getElementById("paisIgreja").value
        };

        alunos.push(novoAluno);
        localStorage.setItem("alunos", JSON.stringify(alunos));
        alunoForm.reset();
        alert("Jovem adicionado com sucesso!");
    });
});
