export const obterElemento = (id) => document.getElementById(id);
export const info = obterElemento("info");
export const placeholder = obterElemento("naoSelecionado");
export const btts = obterElemento("btts");

export const atualizar = (tema, botao) =>{
    if (tema === "dark") {
        document.body.classList.add("dark");
        botao.textContent = '🌙';
    } else {
        document.body.classList.add("light");
        botao.textContent = '☀️';
    }
}

export const buscarInacabado = (campo) => campo.value = sessionStorage.getItem(campo);

export const limparInfo = (addPh) => {
    if(addPh) info.appendChild(placeholder);
    info.querySelectorAll("li").forEach(item => item.remove());
    btts.querySelectorAll("button").forEach(item => item.remove());
}

export const criarBtt = (id, nome) => {
    const btt = document.createElement("button");
    btt.id = id;
    btt.className = id;
    btt.textContent = nome;
    btts.appendChild(btt);
}
