/********************************************************************
 * Objetivo: Arquivo responsável pelas funções de calculos financeiros
 * Autor: Enzzo
 * Data: 11/02/2026
 * Versão: 1.1
 ********************************************************************/

function calcularMedia (valor1, valor2, valor3, valor4){
    nota1 = Number(valor1)
    nota2 = Number(valor2)
    nota3 = Number(valor3)
    nota4 = Number(valor4)

    let media = (nota1 + nota2 + nota3 + nota4)/4
    return Number(media.toFixed(2))

}

function validacaoStatus(media){
    let statusAluno

    let media = calcularMedia(valor1, valor2, valor3, valor4)

    //Validação do status do aluno
    if( mediaM < 50){
        statusAluno = 'REPROVADO'

    }else if(mediaM >= 50 && mediaM < 70){
        statusAluno = 'RECUPERÇÃO'

    }else if(mediaM >= 70){
        statusAluno = 'APROVADO'
    }
    return statusAluno
}
module.exports = {
    calcularMedia,
    validacaoStatus
    
}