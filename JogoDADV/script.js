//iniciando
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("chute").disabled = true;
    document.getElementById("chutar").disabled = true;
    document.getElementById("reiniciar").disabled = true;
});

//utilitarios

const obterElemento = (id) => document.getElementById(id);
const bloquear = (elemento) => obterElemento(elemento).disabled = true;
const desbloquear = (elemento) => obterElemento(elemento).disabled = false;
const sortear = (limite) => Math.floor(Math.random() * (limite+1));
const limpar = () => {
    obterElemento("range").value = "";
    obterElemento("limiteDT").value = "";
    obterElemento("chute").value = "";
    obterElemento("dica").textContent = "";
    obterElemento("limite").textContent = "";
    obterElemento("historico").textContent = "";
}

//variaveis
let num = 0;
let tentativasRestantes = 1;
let range = 1;

//botao config
function configurar(){
    num = sortear(parseInt(obterElemento("range").value));
    range = parseInt(obterElemento("range").value);
    tentativasRestantes = obterElemento("limiteDT").value;
    bloquear("range");
    bloquear("limiteDT");
    bloquear("enviar");
    desbloquear("chute");
    desbloquear("chutar");
    desbloquear("reiniciar");
    obterElemento("limite").textContent = tentativasRestantes;
}

//botao chutar
function feedback(chute){
    //atualizar dicas
    if(chute < 0 || chute > range || chute === ""){
        obterElemento("dica").textContent = 'Por favor faça um chute válido.';
        return;
    }else if(chute == num){
        obterElemento("dica").textContent = 'VOCÊ GANHOU :D O número secreto era ' + chute + '! Para jogar novamente, clique em "Reiniciar" e configure novamente. ';
        bloquear("chute");
        bloquear("chutar");
    }else if(tentativasRestantes == 0){
        obterElemento("dica").textContent = 'Você perdeu :( O número secreto era ' + num + '! Para jogar novamente, clique em "Reiniciar" e configure novamente. ';
    }else if(chute < num){
        obterElemento("dica").textContent = 'Ainda não acertou, o número secreto é MAIOR que ' + chute + '.';
    }else if(chute > num){
        obterElemento("dica").textContent = 'Ainda não acertou, o número secreto é MENOR que ' + chute + '.';
   }

    //atualizar contador
    tentativasRestantes--;
    obterElemento("limite").textContent = tentativasRestantes;
    

    //atualizar histórico
    obterElemento("historico").textContent += chute + ', ';

    //limpar campo de chute
    obterElemento("chute").value = "";
}

//botao reiniciar
function reiniciar(){
    limpar();
    desbloquear("range");
    desbloquear("limiteDT");
    desbloquear("enviar");
    bloquear("chute");
    bloquear("chutar");
    bloquear("reiniciar");
}
