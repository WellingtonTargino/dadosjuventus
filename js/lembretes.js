document.addEventListener("DOMContentLoaded", function() {
    const listaLembretes = document.getElementById("lista-lembretes");
    const listaMensal = document.getElementById("lista-mensal");
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    function formatarData(data) {
        const [ano, mes, dia] = data.split("-");
        return { dia: parseInt(dia), mes: parseInt(mes), ano: parseInt(ano) };
    }

    function calcularIdade(dataNascimento) {
        const hoje = new Date();
        const dataNasc = new Date(dataNascimento.ano, dataNascimento.mes - 1, dataNascimento.dia);
        let idade = hoje.getFullYear() - dataNascimento.ano;
        if (hoje < new Date(hoje.getFullYear(), dataNascimento.mes - 1, dataNascimento.dia)) {
            idade--;
        }
        return idade;
    }

    function verificarAniversariantes(alunos) {
        const hoje = new Date();
        const diaAtual = hoje.getDate();
        const mesAtual = hoje.getMonth() + 1;

        const aniversariantesHoje = alunos.filter(aluno => {
            const { dia, mes } = formatarData(aluno.dataNascimento);
            return dia === diaAtual && mes === mesAtual;
        });

        const aniversariantesMes = alunos.filter(aluno => {
            const { mes } = formatarData(aluno.dataNascimento);
            return mes === mesAtual;
        });

        return { hoje: aniversariantesHoje, mes: aniversariantesMes };
    }

    function renderizarAniversariantes(aniversariantes, container, titulo) {
        const tituloElemento = document.createElement("h3");
        tituloElemento.textContent = titulo;
        container.appendChild(tituloElemento);

        aniversariantes.forEach(aluno => {
            const { dia, mes, ano } = formatarData(aluno.dataNascimento);
            const idade = calcularIdade({ dia, mes, ano });
            const li = document.createElement("li");
            li.textContent = `${aluno.nomeCompleto} - ${dia}/${mes}/${ano} (${idade} anos)`;
            container.appendChild(li);
        });
    }

    const { hoje, mes } = verificarAniversariantes(alunos);

    if (hoje.length > 0) {
        renderizarAniversariantes(hoje, listaLembretes, "Aniversariantes de Hoje");
    } else {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum aniversariante hoje.";
        listaLembretes.appendChild(mensagem);
    }

    if (mes.length > 0) {
        renderizarAniversariantes(mes, listaMensal, "Aniversariantes do Mês");
    } else {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum aniversariante neste mês.";
        listaMensal.appendChild(mensagem);
    }
});
