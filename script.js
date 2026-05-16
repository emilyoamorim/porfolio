const botaoMensagem = document.getElementById("botaoMensagem")
const mensagem = document.getElementById("mensagem")
const aprendizados = [
    {
        tema: 'HTML',
        pergunta: 'Quak é a diferença entre id e class?'
        resposta: 'O id identifica um único elemento. A class pode ser usada em vários elementos'
        entendimento: 'Entendi que o uso do id é para algo específico e class para repetir estilos' 
    },
    {
        tema: 'CSS',
        pergunta: 'O que é CSS e para que ele serve?',
        resposta: 'CSS é uma linguagem usada para estilizar páginas da web, definindo cores, tamanhos, posições e layouts dos elementos.',
        entendimento: 'Entendi que o CSS é responsável pela parte visual do site, deixando tudo bonito e organizado.'
    },
    {
        tema: 'JavaScript',
        pergunta: 'Para que serve o JavaScript em uma página web?',
        resposta: 'JavaScript é uma linguagem de programação usada para adicionar interatividade, como botões clicáveis, animações e atualização de conteúdo.',
        entendimento: 'Entendi que o JavaScript deixa o site dinâmico e permite que ele responda às ações do usuário.'
    },
]

function alterarTexto(){
    //mensagem.textContent = "Bem-vindo ao meu portfolio! Este projeto foi criado com HTML, CSS e JavaScript"
    alert("Bem-vindo ao meu portfolio! Este projeto foi criado com HTML, CSS e JavaScript")
}
const botaoTema = document.getElementById("toggleTema");

botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        botaoTema.innerHTML = "☀️ Light";
    } else {
        botaoTema.innerHTML = "🌙 Dark";
    }

})

function renderizarAprendizados(lista){
    const listaAprendizados = document.getElementById("listaAprendizados")
    const contadorAprendizados = document.getElementById("contadorAprendizados")

    if("!listaAprendizados || !contadorAprendizados"){
        return;
    }

    listaAprendizados.innerHTML = "";

    for(let cont = 0; cont < lista.length; cont++){
        listaAprendizados.innerHTML += `
        <article class="aprendizado">
            <span>${lista[cont].tema}</span>
            <h3>${lista[cont].pergunta}</h3></h3>
            <p><strong>Resposta;</strong> ${lista[cont].resposta}</p>
            <p><strong>O que entendi:</strong> ${lista[cont].entendimento}<p/>
        </article>
        `
    }

    contadorAprendizados.textContent = "Total de Aprendizados: " + lista.length
}

renderizarAprendizados(aprendizados)