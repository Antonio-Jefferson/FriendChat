let listaDeMensagens =[];
let userOn;
let nome;
function menuMobile(){
    const menuMobile = document.querySelector('.navbar');
    menuMobile.classList.toggle('escondido');
}
function cadastrar(){
    const login = document.querySelector('.login'); 
    const main = document.querySelector('.conteiner-main')
    nome = document.querySelector('.name').value;
    login.classList.remove('login');
    login.classList.add('escondido')
    main.classList.remove('escondido');
    userName()
}
function userName(){
    const objNome = 
    {
        name: nome
    }
    const promesi = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objNome);
    promesi.then(respotaUser)
    function respotaUser(){
        console.log('user add')
    }
}
function veriricarOnline(){
    const verificarUser = 
    {
        name:nome
    }
    const verificar = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", verificarUser);
    verificar.then(ativo);
    verificar.catch(ausente);
    function ativo(){
        console.log("Presente")
        participantesOnlines()
    } 
}
setTimeout(veriricarOnline, 5000);


function bucarMensagens(){
    const buscar = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    buscar.then(resposta);
    function resposta(mensagens){
        console.log("achei");
        listaDeMensagens = mensagens.data
        sedMensagem() 
    }
    setTimeout(bucarMensagens, 2000)
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
        cadastrar()
   }
})
function servSMS(){
    let mess = document.querySelector('.text').value;
    const objMess = {
        from: nome,
        to:"nome do destinatário (Todos se não for um específico)",
        text: mess,
        type:"message"
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
    const ul = document.querySelector('.sms');
    ul.innerHTML ="";
    for(let i = 0; i < listaDeMensagens.length; i++){
         const sms = listaDeMensagens[i].text
         const nomes = listaDeMensagens[i].from
         if(listaDeMensagens[i].type === 'message'){
            ul.innerHTML += `
            <li class="mgs">
                <p><span>(${time})</span> <strong>${nomes}</strong>  para <strong>Todos</strong>: ${sms}</p>
            </li>`
        }else if(listaDeMensagens[i].type === 'private_message'){
            ul.innerHTML +=
            `<li class="reservadamente">
                 <p><span>(${time})</span> <strong>${nomes}</strong> reservadamente para <strong>Maria</strong>: ${sms}</p>
            </li>`
        }else if(listaDeMensagens[i].type === "status" ){
            ul.innerHTML += `
            <li class="entrou-saiu">
                <p><span>(${time})</span> <strong>${nomes}</strong> entra na sala...</p>
            </li>`
        }
       
    }
} 
function participantesOnlines(){
    const userOnline = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    userOnline.then(on);
    function on(respostaON){
        console.log('Users encontrados')
        userOn = respostaON.data
        console.log(userOn)
        listadeUsarios()
    }
}
function listadeUsarios(){
    const listaOnline = document.querySelector('.listaDeOnline');
    for(let i = 0; i < userOn.length; i++){
       let online = userOn[i].name
       listaOnline.innerHTML += ` 
        <li onclick='selecionando(this)'>
            <div>
                <ion-icon name="person-circle"></ion-icon>
                <p>${online}</p>
            </div>
            <ion-icon name="checkmark"></ion-icon>
        </li>`
    }
}
hora();
participantesOnlines()
bucarMensagens();