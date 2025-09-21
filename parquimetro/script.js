//iniciando
    document.addEventListener("DOMContentLoaded", () => 
    document.getElementById("retirar").disabled = true);

//utilitarios
    const obterElemento = (id) => document.getElementById(id);
    const bloquear = (elemento) => obterElemento(elemento).disabled = true;
    const desbloquear = (elemento) => obterElemento(elemento).disabled = false;
    const limpar = (id) => {
        obterElemento(id).value = "";
        obterElemento(id).textContent = "";
    }
    const form = (valor) => valor.toLocaleString("pt-BR", { 
    style: "currency", 
    currency: "BRL" 
    });

//objetos
    class reserva{
        constructor(valor){
            if(valor < 1 || isNaN(valor)){
                this.deposito = 0;
            }else if(valor < 1.75){
                this.deposito = valor;
                this.tempo = 30;
                this.troco = valor-1;
            }else if(valor < 3){
                this.deposito = valor;
                this.tempo = 60;
                this.troco = valor-1.75;
            }else {
                this.deposito = valor;
                this.tempo = 120;
                this.troco = valor-3;
            }
        }

        exibirResumo(){
            if(this.deposito == 0){
                obterElemento("resumo").textContent = 'Valor insuficiente para o tempo mínimo';
            }else {
                obterElemento("resumo").textContent = 'Você depositou ' + form(this.deposito) + ', esta vaga ficará reservada pra você por ' + this.tempo + ' minutos, tenha um bom dia!';
            }
        }

        exibirTroco(){
            obterElemento("valortroco").textContent = form(this.troco);

        }

    }

//botao depositar
    function feedback(valor){
        const novaReserva = new reserva(valor);
        
        //atualizar campos
        novaReserva.exibirResumo();
        novaReserva.exibirTroco();

        //limpar ambiente
        limpar("valor");
        bloquear("valor");
        bloquear("depositar");
        desbloquear("retirar");
    }

//botao retirar
    function retirar(){
        limpar("resumo");
        limpar("valortroco");
        desbloquear("valor");
        desbloquear("depositar");
        bloquear("retirar");
    }
