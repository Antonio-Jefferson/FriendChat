let listaDeMensagens =[];
let nome;

function userName(){
    nome = prompt("Qual é seu nome: ");
    const objNome = 
    {
        name: nome
    }
    const promesi = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objNome);
    promesi.then(respotaUser)
    function respotaUser(){
        alert("User add")
        sedMensagem()
    }
}
function veriricarOnline(){
    const verificarUser = 
    {
        name:nome
    }
    const verificar = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", verificarUser);
    verificar.then(ativo)
    function ativo(){
        console.log("Presente")
        sedMensagem()
        setTimeout(veriricarOnline, 1000);
    }  
}


function bucarMensagens(){
    const buscar = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    buscar.then(resposta);
    function resposta(mensagens){
        console.log("achei");
        listaDeMensagens = mensagens.data
        sedMensagem() 
    }
    setTimeout(bucarMensagens, 1000)
}


function hora(){
    let day = new Date();
    let horaAtual = day.getHours();
    let minuto = day.getMinutes()
    let segundos = day.getSeconds()
    time = `${horaAtual}:${minuto}:${segundos}`
}
document.addEventListener("keypress", function(evento){
   if(evento.key === 'Enter'){
        servSMS()
   }
})
function servSMS(){
    let mess = document.querySelector('.text').value;
    const objMess = {
        from: nome,
        to:"nome do destinatário (Todos se não for um específico)",
        text: mess,
        type:"message" // ou "private_message" para o bônus
    }
    listaDeMensagens = objMess;
    const messEnviadas = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', objMess);
    messEnviadas.then(lerResposta)
}
function lerResposta(){
    console.log("mensagem enviada");
    sedMensagem()
}

function sedMensagem(){
    const ul = document.querySelector('ul');
    ul.innerHTML ="";
    for(let i = 0; i < listaDeMensagens.length; i++){
         const sms = listaDeMensagens[i].text
         const nomes = listaDeMensagens[i].from
        ul.innerHTML += `
        <li class="mgs">
            <p><span>(${time})</span> <strong>${nomes}</strong>  para <strong>Todos</strong>: ${sms}</p>
        </li>
    `}
} 
hora();
userName();
bucarMensagens();