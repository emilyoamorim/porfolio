const botaoMensagem = document.getElementById("botaoMensagem");
const mensagem = document.getElementById("mensagem");
const aprendizados = [
    {
        tema: "HTML",
        pergunta: "Qual é a diferença entre id e class?",
        resposta: "O id identifica um único elemento. A class pode ser usada em vários elementos",
        entendimento: "Entendi que uso id para algo específico e class para repetir estilos"
    },
    {
        tema: "CSS",
        pergunta: "Quando usar flexbox e grid?",
        resposta: "Flexbox organiza elementos em uma direção. Grid organiza elementos em linhas e colunas.",
        entendimento: "Entendi que grid é melhor para montar áreas com vários cards."
    },
    {
        tema: "JavaScript",
        pergunta: "Para que serve uma função?",
        resposta: "Uma função guarda um conjunto de comandos que podem ser executados quando forem chamados.",
        entendimento: "Entendi que funções ajudam a organizar e reaproveitar código."
    }
]

const chaveAprendizadosSalvos = "meusAprendizadosIA";
let aprendizadosSalvos = carregarAprendizadosSalvos();

for(let cont = 0; cont < aprendizadosSalvos.length; cont++){
    aprendizados.push(aprendizadosSalvos[cont]);
}

salvarAprendizadosPersonalizados();

function alterarTexto() {
    alert("Bem-vindo ao meu portfólio! Este projeto foi criado com HTML, CSS e JavaScript.");
}

function mostrarTecnologia(tecnologia) {
    const texto = document.getElementById("tecnologiaSelecionada");

    texto.textContent = "Você selecionou: " + tecnologia;
}

function alterarTema() {
    document.body.classList.toggle("tema-escuro");

    const temaEscuroAtivo = document.body.classList.contains("tema-escuro");

    if (temaEscuroAtivo) {
        localStorage.setItem("tema", "escuro");
    } else {
        localStorage.setItem("tema", "claro");
    }

    atualizarBotaoTema();
}

function atualizarBotaoTema() {
    const botaoTema = document.getElementById("botaoTema");

    if(!botaoTema){
        return;
    }

    if(document.body.classList.contains("tema-escuro")){
        botaoTema.textContent = "Light";
    }
    else{
        botaoTema.textContent = "Dark";
    }
}

window.onload = function () {

    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {
        document.body.classList.add("tema-escuro");
    }

    atualizarBotaoTema();
    configurarFormularioAprendizados();
}

function configurarFormularioAprendizados(){
    const botaoNovoRegistro = document.getElementById("botaoNovoRegistro");
    const camposRegistro = document.getElementById("camposRegistro");

    if(!botaoNovoRegistro || !camposRegistro){
        return;
    }

    camposRegistro.classList.add("oculto");
    botaoNovoRegistro.textContent = "Novo registro";

    botaoNovoRegistro.addEventListener("click", function () {
        camposRegistro.classList.toggle("oculto");

        if(camposRegistro.classList.contains("oculto")){
            botaoNovoRegistro.textContent = "Novo registro";
        }
        else{
            botaoNovoRegistro.textContent = "Fechar";
        }
    });
}

function renderizarAprendizados(lista){
    const listaAprendizados = document.getElementById("listaAprendizados")
    const contadorAprendizados = document.getElementById("contadorAprendizados")

    if(!listaAprendizados || !contadorAprendizados){
        return;
    }

    listaAprendizados.innerHTML = "";

    for(let cont = 0; cont < lista.length; cont++){
        const botaoExcluir = lista[cont].personalizado ? `
            <button type="button" class="botao-excluir" onclick="excluirAprendizado('${escaparHtml(lista[cont].id)}')">
                Excluir
            </button>
        ` : "";

        listaAprendizados.innerHTML += `
        <article class="card">
            <span class="card-tag">${escaparHtml(lista[cont].tema)}</span>
            <h3>${escaparHtml(lista[cont].pergunta)}</h3>
            <p><strong>Resposta:</strong> ${escaparHtml(lista[cont].resposta)}</p>
            <p><strong>O que entendi:</strong> ${escaparHtml(lista[cont].entendimento)}</p>
            ${botaoExcluir}
        </article>
        ` 
    }

    contadorAprendizados.textContent = "Total de Aprendizados: " + lista.length
}

renderizarAprendizados(aprendizados)

function escaparHtml(texto){
    return String(texto)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function carregarAprendizadosSalvos(){
    const chavesAntigas = ["aprendizadosExtras", "aprendizadosPersonalizados"];
    const salvos = JSON.parse(localStorage.getItem(chaveAprendizadosSalvos)) || [];

    for(let cont = 0; cont < chavesAntigas.length; cont++){
        const registrosAntigos = JSON.parse(localStorage.getItem(chavesAntigas[cont])) || [];

        for(let indice = 0; indice < registrosAntigos.length; indice++){
            salvos.push(registrosAntigos[indice]);
        }

        localStorage.removeItem(chavesAntigas[cont]);
    }

    return salvos.map(function (item){
        return {
            id: item.id || gerarIdAprendizado(),
            tema: item.tema,
            pergunta: item.pergunta,
            resposta: item.resposta,
            entendimento: item.entendimento,
            personalizado: true
        }
    });
}

function gerarIdAprendizado(){
    return "aprendizado-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
}

function salvarAprendizadosPersonalizados(){
    localStorage.setItem(chaveAprendizadosSalvos, JSON.stringify(aprendizadosSalvos));
}

function adicionarAprendizado(event){
    event.preventDefault();

    const formulario = event.target;
    const tema = document.getElementById("tema").value;
    const pergunta = document.getElementById("pergunta").value.trim();
    const resposta = document.getElementById("resposta").value.trim();
    const entendimento = document.getElementById("entendimento").value.trim();

    const novoAprendizado = {
        id: gerarIdAprendizado(),
        tema: tema,
        pergunta: pergunta,
        resposta: resposta,
        entendimento: entendimento,
        personalizado: true
    }

    aprendizados.push(novoAprendizado);
    aprendizadosSalvos.push(novoAprendizado);
    salvarAprendizadosPersonalizados();

    formulario.reset();
    renderizarAprendizados(aprendizados);

    const camposRegistro = document.getElementById("camposRegistro");
    const botaoNovoRegistro = document.getElementById("botaoNovoRegistro");
    const listaAprendizados = document.getElementById("listaAprendizados");
    const botaoAprendizados = document.getElementById("botaoAprendizados");

    if(camposRegistro && botaoNovoRegistro){
        camposRegistro.classList.add("oculto");
        botaoNovoRegistro.textContent = "Novo registro";
    }

    if(listaAprendizados && listaAprendizados.classList.contains("oculto")){
        listaAprendizados.classList.remove("oculto");
        botaoAprendizados.textContent = "Ocultar Aprendizados";
    }
}

function filtrarAprendizados(tema){
    filtrarAprendizado(tema);
}

function excluirAprendizado(id){
    aprendizadosSalvos = aprendizadosSalvos.filter(function (item){
        return item.id !== id;
    });

    for(let cont = aprendizados.length - 1; cont >= 0; cont--){
        if(aprendizados[cont].id === id){
            aprendizados.splice(cont, 1);
        }
    }

    salvarAprendizadosPersonalizados();
    renderizarAprendizados(aprendizados);
}

function filtrarAprendizado(tema){
    if (tema == "Todos"){
        renderizarAprendizados(aprendizados);
        return;

    }
    else {
        const filtrados = aprendizados.filter(function (item){
            return item.tema == tema;

        })

        renderizarAprendizados(filtrados);
        }
    }

function mostrarOcultarAprendizados(){
    const listaAprendizados = document.getElementById("listaAprendizados")
    const botaoAprendizados = document.getElementById("botaoAprendizados")

    if(!listaAprendizados || !botaoAprendizados){
        return;
    }

    listaAprendizados.classList.toggle("oculto")

    const aprendizadosOcultos = listaAprendizados.classList.contains("oculto")

    if(aprendizadosOcultos){
        botaoAprendizados.textContent = "Mostrar Aprendizados"
    }
    else{
        botaoAprendizados.textContent = "Ocultar Aprendizados"
    }
}

