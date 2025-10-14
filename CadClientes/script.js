//utilitarios
    const link = "https://crudcrud.com/api/21d6c1c417b242239440e2d23d17f2b3";
    const obterElemento = (id) => document.getElementById(id);
    const atualizar = (tema, botao) =>{
        if (tema === "dark") {
            document.body.classList.add("dark");
            botao.textContent = '🌙';
        } else {
            document.body.classList.add("light");
            botao.textContent = '☀️';
        }
    }
    const enviar = (id) =>{
        const txt = obterElemento(id).value;

    }

//buscar digitação inacabada
    document.addEventListener("DOMContentLoaded", () => {
        obterElemento("nome").value = sessionStorage.getItem("nome");
        obterElemento("mail").value = sessionStorage.getItem("mail");
        obterElemento("end").value = sessionStorage.getItem("end");
        obterElemento("fone").value = sessionStorage.getItem("fone");
    })


//ouvir fim da digitaçao e salvar
    const inputs = document.querySelectorAll("input");

    inputs.forEach(entrada => {
        entrada.addEventListener("blur", (evento) => {
            const id = evento.target.id;
            const txt = evento.target.value;
            sessionStorage.setItem(id, txt);
        });
    });

//buscar registros salvos
    const lista = obterElemento("regs");

    fetch(`${link}/registros`)
        .then(resposta => {
        console.log('Status:', resposta.status);
        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }
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
            if (!resposta.ok) {
                throw new Error('Erro na requisição');
            }
            return resposta.json();
        })
        .then(cliente => {
                const item = document.createElement("li");

                item.innerHTML = `${cliente.nome} <div class= "libtt" data-id="${cliente._id}"> <button class="ver">+</button> </div> `;
                lista.appendChild(item);
        })
        .catch(error => console.error("Erro ao enviar", error));

        obterElemento("nome").value = "";
        obterElemento("mail").value = "";
        obterElemento("end").value = "";
        obterElemento("fone").value = "";
        sessionStorage.setItem("nome", "");
        sessionStorage.setItem("mail", "");
        sessionStorage.setItem("end", "");
        sessionStorage.setItem("fone", "");
    
    })

//botao +
    let ocupado = false;
    let id = "aaa";
    const placeholder = obterElemento("naoSelecionado");

    document.addEventListener("click", (evento) =>{
        const btt = evento.target.closest(".ver");
        if(!btt) return;

        id = evento.target.closest(".libtt").dataset.id;
        const info = obterElemento("info");

        fetch(`${link}/registros/${id}`)
        .then(resposta => {
        console.log('Status:', resposta.status);
        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }
        return resposta.json();
        })
        .then(cliente => {
            if(!!ocupado){
                obterElemento("info").querySelectorAll("li").forEach(item =>{
                    item.remove();
                });
            }
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
        })
        .catch(error => console.error("Erro ao solicitar dados", error));

        if(!ocupado) {
            placeholder.remove();
            ocupado = true;
        }

        const bttlim = document.createElement("button");
        bttlim.id = "lim";
        bttlim.className = "lim";
        bttlim.textContent = `Limpar`;
        obterElemento("btts").appendChild(bttlim);
        const bttx = document.createElement("button");
        bttx.id = "x";
        bttx.className = "x";
        bttx.textContent = `Excluir`;
        obterElemento("btts").appendChild(bttx);
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
                alvo = document.querySelector(`.libtt[data-id="${id}"]`);
                alvo.closest("li").remove();
                obterElemento("lim").remove();
                obterElemento(`x`).remove();
                obterElemento("info").querySelectorAll("li").forEach(item =>{
                    item.remove();
                });
                obterElemento("info").appendChild(placeholder);
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

        obterElemento("lim").remove();
        obterElemento(`x`).remove();
        obterElemento("info").querySelectorAll("li").forEach(item =>{
            item.remove();
        });
        obterElemento("info").appendChild(placeholder);
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