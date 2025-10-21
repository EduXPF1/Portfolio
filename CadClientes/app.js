//utilitarios
    const link = "https://crudcrud.com/api/91978e23daee4c6eaf6dadf10e6d12ad";
    import { obterElemento, atualizar, buscarInacabado, limparInfo, info, btts, placeholder, criarBtt } from "./util.js";

//ouvir fim da digitaçao e salvar
    const inputs = document.querySelectorAll("input");

    inputs.forEach(entrada => {
        document.addEventListener("DOMContentLoaded", () => buscarInacabado(entrada))
        entrada.addEventListener("blur", (evento) => sessionStorage.setItem(evento.target.id, evento.target.value))
    });

//buscar registros salvos
    const lista = obterElemento("regs");

    fetch(`${link}/registros`)
        .then(resposta => {
        console.log('Status:', resposta.status);
        if (!resposta.ok) throw new Error('Erro na requisição');
        return resposta.json();
        })

        .then(listaReg => {
            listaReg.forEach(cliente => {
                const item = document.createElement("li");
                item.innerHTML = `${cliente.nome} <div class= "libtt" data-id="${cliente._id}"> <button class="ver">+</button> </div> `;
                lista.appendChild(item);
            });
        });

//botao cadastrar
    obterElemento("cad").addEventListener("click", (evento) =>{
        evento.preventDefault();

        const camposObrigatorios = document.querySelectorAll("input[required]");
        let valido = true;

        camposObrigatorios.forEach(campo => {
            if (!campo.value.trim()) {
                valido = false;
                campo.classList.add("erro");
                setTimeout(() => {
                    campo.classList.remove("erro");
                }, 1500);
            }
        });

        if (!valido) {
            console.warn("Preencha os campos obrigatórios.");
            return;
        }

        fetch(`${link}/registros`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                    nome: obterElemento("nome").value,
                    email: obterElemento("mail").value,
                    end: obterElemento("end").value,
                    fone: obterElemento("fone").value
            })
        })
        .then(resposta => {
            if (!resposta.ok) throw new Error('Erro na requisição');
            return resposta.json();
        })
        .then(cliente => {
                const item = document.createElement("li");
                item.innerHTML = `${cliente.nome} <div class= "libtt" data-id="${cliente._id}"> <button class="ver">+</button> </div> `;
                lista.appendChild(item);
        })
        .catch(error => console.error("Erro ao enviar", error));

        inputs.forEach(campo => {
            campo.value = "";
            sessionStorage.setItem(campo, "");
        });
    })

//botao +
    let ocupado = false;
    let id = "aa";

    document.addEventListener("click", (evento) =>{
        const btt = evento.target.closest(".ver");
        if(!btt) return;

        id = evento.target.closest(".libtt").dataset.id;

        if(ocupado) limparInfo(false)

        fetch(`${link}/registros/${id}`)
        .then(resposta => {
        console.log('Status:', resposta.status);
        if (!resposta.ok) throw new Error('Erro na requisição');
        return resposta.json();
        })
        .then(cliente => {
            console.log("cliente", cliente);

            const nome = document.createElement("li");
            nome.innerHTML = `Nome: ${cliente.nome}`;
            info.appendChild(nome);
            const mail = document.createElement("li");
            mail.innerHTML = `Email: ${cliente.email}`;
            info.appendChild(mail);
            const end = document.createElement("li");
            end.innerHTML = `Endereço: ${cliente.end}`;
            info.appendChild(end);
            const fone = document.createElement("li");
            fone.innerHTML = `Telefone: ${cliente.fone}`;
            info.appendChild(fone);
            criarBtt("lim", "Limpar");
            criarBtt("x", "Excluir");
        })
        .catch(error => console.error("Erro ao solicitar dados", error));

        if(!ocupado) {
            placeholder.remove();
            ocupado = true;
        }
    });

//botao x
    document.addEventListener("click", (evento) =>{
        const btt = evento.target.closest(".x");
        if(!btt) return;

        fetch(`${link}/registros/${id}`, {
            method: "DELETE"
        })
        .then(res => {
            if (res.ok) {
                const alvo = document.querySelector(`.libtt[data-id="${id}"]`);
                alvo.closest("li").remove();
                limparInfo(true);
                ocupado = false;
            } else {
                console.error("Erro ao deletar:", res.status);
            }
        })
        .catch(err => console.error("Falha na requisição DELETE:", err));
    });

//botao limpar
    document.addEventListener("click", (evento) =>{
        const btt = evento.target.closest(".lim");
        if(!btt) return;

        limparInfo(true);
        ocupado = false;
    });

//botao de tema
document.addEventListener("DOMContentLoaded", () => {
    const botaoTema = obterElemento("botaoTema");

    // Verificar se tem tema salvo
        const temaSalvo = localStorage.getItem("tema");
        atualizar(temaSalvo, botaoTema);

    botaoTema.addEventListener("click", () => {
        const temaAtual = localStorage.getItem("tema");
        const novoTema = temaAtual === "dark" ? "light" : "dark";
        atualizar(novoTema, botaoTema);
        document.body.classList.replace(temaAtual, novoTema);
        // Salvar as preferências no LocalStorage
        localStorage.setItem("tema", novoTema);
        botaoTema.textContent = novoTema === "dark" ? '🌙' : '☀️';
    });
    
});