function calcular(){
    //entrada
        let peso = document.getElementById("peso").value;
        let altu = document.getElementById("altu").value;
        
    //processamento
        let imc = Math.round(peso / (altu * altu) * 100) / 100;

    //saida
        document.getElementById("resul").textContent = "Seu IMC atual é: " + imc;

        if (imc < 18.5){
            document.getElementById("tab").textContent = "Você está abaixo do peso 'ideal'.";
        }else if(imc < 25.0){
            document.getElementById("tab").textContent = "O seu peso está dentro do 'ideal'.";
        }else if(imc < 30.0){
            document.getElementById("tab").textContent = "Você está acima do peso 'ideal'.";
        }else if(imc < 35.0){
            document.getElementById("tab").textContent = "O seu peso se enquadra em Obesidade grau 1.";
        }else if(imc < 40.0){
            document.getElementById("tab").textContent = "O seu peso se enquadra em Obesidade grau 2.";
        }else if(imc >=40.0){
            document.getElementById("tab").textContent = "O seu peso se enquadra em Obesidade grau 3.";
        }else{
            document.getElementById("tab").textContent = "Por favor informe valores válidos.";
        };
}
