//utilitarios
    const obterElemento = (id) => document.getElementById(id);
    const atualizar = (tema) =>{
        if (tema === "dark") {
            document.body.classList.add("dark");
            botaoTema.textContent = '🌙';
        } else {
            document.body.classList.add("light");
            botaoTema.textContent = '☀️';
        }
    }

//ouvir evento cep
obterElemento("cep").addEventListener("blur", (evento)=>{
    const elemento = evento.target;
    const cep = elemento.value;
    
    //validar cep
    if(!(cep.length === 8))
    return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            //processamento da pagina
            if(!data.erro){
                obterElemento("logradouro").value = data.logradouro;
                obterElemento("bairro").value = data.bairro;
                obterElemento("cidade").value = data.localidade;
                obterElemento("estado").value = data.uf;
                obterElemento("ddd").value = data.ddd;
                sessionStorage.setItem("cep", cep);
                sessionStorage.setItem("logradouro", data.logradouro);
                sessionStorage.setItem("bairro", data.bairro);
                sessionStorage.setItem("cidade", data.localidade);
                sessionStorage.setItem("estado", data.uf);
                sessionStorage.setItem("ddd", data.ddd);
            }else{
                alert("CEP não encontrado.");
            }
        })
        .catch(error => console.error("Erro ao buscar CEP", error));
})

//botao de tema
document.addEventListener("DOMContentLoaded", () => {
    const botaoTema = obterElemento("botaoTema");

    // Verificar se tem tema salvo
        const temaSalvo = localStorage.getItem("tema");
        atualizar(temaSalvo);
        obterElemento("cep").value = sessionStorage.getItem("cep");
        obterElemento("logradouro").value = sessionStorage.getItem("logradouro");
        obterElemento("bairro").value = sessionStorage.getItem("bairro");
        obterElemento("cidade").value = sessionStorage.getItem("cidade");
        obterElemento("estado").value = sessionStorage.getItem("estado");
        obterElemento("ddd").value = sessionStorage.getItem("ddd");

    botaoTema.addEventListener("click", () => {
        // Verificar se o usuário já tem um tema pré-definido
        const temaAtual = localStorage.getItem("tema");
        // Verificar qual é o tema e inverter
        const novoTema = temaAtual === "dark" ? "light" : "dark";
        atualizar(novoTema);
        // Alterar a classe no body
        document.body.classList.replace(temaAtual, novoTema);
        // Salvar as preferências no LocalStorage
        localStorage.setItem("tema", novoTema);
        // Atualiza o texto do botão
        botaoTema.textContent = novoTema === "dark" ? '🌙' : '☀️';
    });

    
});