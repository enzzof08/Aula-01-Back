/********************************************************************
 * Objetivo: Arquivo responsável pelas funções de calculos financeiros
 * Autor: Enzzo
 * Data: 11/02/2026
 * Versão: 
 ********************************************************************/


//Função para retorna o percentual de um número
function calcularPercentual(numero){
    //Recebe o  numero encaminhado
    let numeroPercentual = Number(numero)

    //Validação de entrada vazia, menor ou igual a 0 e de caracter
    if(numero == '' || numero <= 0 || isNaN(numero)){
        return false
    }else{
    //Calcula o percentual do número
    let percentual = numeroPercentual / 100

    return Number(percentual.toFixed(2))
    }

}
//Função para retornar o montante referente a juros composto
function calcularJurosCompostos(valor, taxa, parcelas){
    let valorPrincipal = Number(valor)
    let taxaJuros = Number(taxa)
    let qtdeParcelas = Number(parcelas)

    if(valor == '' || isNaN(valor) || valor <=0 || parcelas <=0 || parcelas == '' || isNaN(parcelas)){
        return false
    } else{
    //Chama a função para retorna o percentual da taxa
    let percentual = calcularPercentual(taxaJuros)
    

    if(percentual){
        //Calculo
        let montante = valorPrincipal * ((1 + percentual) ** qtdeParcelas)
        return Number(montante.toFixed(2)) 
    }else{
        return false
    }
}
}

module.exports = {
    calcularPercentual,
    calcularJurosCompostos
}