
let listaDeMensagens = [];
let userOn;
let nome;

document.addEventListener("keydown", function(evento){
    if(evento.key === 'Enter'){
         cadastrar();
    }
 })

function menuMobile(){
    const menuMobile = document.querySelector('.navbar');
    menuMobile.classList.toggle('escondido');
}
function cadastrar(){
    const login = document.querySelector('.login');
    const main = document.querySelector('.conteiner-main')
    nome = document.querySelector('.name').value;
    if(nome === ""){
        return;
    }
    login.classList.remove('login');
    login.classList.add('escondido')
    main.classList.remove('escondido');
    userName();
}
function userName(){
    const objNome =
    {
        name: nome
    }
    const promesi = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objNome);
    promesi.then(respotaUser)
    function respotaUser(){
        document.removeEventListener("keydown", function(evento){
            if(evento.key === 'Enter'){
                 cadastrar();
            }
         });
        document.addEventListener("keydown", function(evento){
            if(evento.key === 'Enter'){
                 servSMS();
            }
         });
        buscarMensagens();
        participantesOnlines();
        setInterval(verificarOnline, 5000);
        setInterval(buscarMensagens, 2000);
        setInterval(participantesOnlines, 7000);
    }
}

function verificarOnline(){
    const verificarUser =
    {
        name:nome
    }
    const verificar = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", verificarUser);
    verificar.then(ativo);
    function ativo(){
        console.log("Presente");
    }
}



function buscarMensagens(){
    const buscar = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    buscar.then(resposta);
    function resposta(mensagens){
        console.log("achei");
        listaDeMensagens = mensagens.data;
        listarMensagens();
    }
}


function servSMS(){
    const mess = document.querySelector('.text').value;
    const objMess = {
        from: nome,
        to:"Todos",
        text: mess,
        type:"message"
    }
    const messEnviadas = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', objMess);
    messEnviadas.then(lerResposta);
}
function lerResposta(){
    console.log("mensagem enviada");
    const mess = document.querySelector('.text');
    mess.value = "";
}

function listarMensagens(){
    const ul = document.querySelector('.sms');
    ul.innerHTML = "";
    for(let i = 0; i < listaDeMensagens.length; i++){
         const sms = listaDeMensagens[i].text
         const nomes = listaDeMensagens[i].from
         if(listaDeMensagens[i].type === 'message'){
            ul.innerHTML += `
            <li class="mgs">
                <p><span>(${listaDeMensagens[i].time})</span> <strong>${nomes}</strong>  para <strong>Todos</strong>: ${sms}</p>
            </li>`
        }else if(listaDeMensagens[i].type === 'private_message'){
            ul.innerHTML +=
            `<li class="reservadamente">
                 <p><span>(${listaDeMensagens[i].time})</span> <strong>${nomes}</strong> reservadamente para <strong>Maria</strong>: ${sms}</p>
            </li>`
        }else{
            ul.innerHTML += `
            <li class="entrou-saiu">
                <p><span>(${listaDeMensagens[i].time})</span> <strong>${nomes}</strong> ${sms}</p>
            </li>`
        }

    }
    ul.lastElementChild.scrollIntoView();
}

function participantesOnlines(){
    const userOnline = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    userOnline.then(on);
    function on(respostaON){
        console.log('Users encontrados')
        userOn = respostaON.data
        console.log(userOn)
        listarUsuarios();
    }
}
function listarUsuarios(){
    const listaOnline = document.querySelector('.listaDeOnline');
    let online;
    listaOnline.innerHTML = "";
    for(let i = 0; i < userOn.length; i++){
       online = userOn[i].name;
       listaOnline.innerHTML += `
        <li onclick='selecionado(this)'>
            <div>
                <ion-icon name="person-circle"></ion-icon>
                <p>${online}</p>
            </div>
            <ion-icon class="escondido" name="checkmark"></ion-icon>
        </li>`
    }
}

