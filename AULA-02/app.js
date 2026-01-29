/*********************************************************************
 * Objetivo: Projeto para realizar o calculo de médias escolares
 * Autor: Enzzo
 * Data: 29/01/2026
 * Versão: 1.0
 **********************************************************************/


/* 
    Tipos de criação de variáveis
    var -> Permite criar um espaço em memória do tipo variável.
            Essa forma de criação é considerada mais antiga,
            é provavel que seja encontrada apenas em projetos 
            mais antingos
            Dica: Caso você precise utilizar o var, recomenda-se
            que seja utilizado apenas em escopo global

    let -> Permite criar um espaço em memória do tipo variável.
            Essa forma de criação é realizada somente no escopo
            local, ou seja, dentro de bloco de programção { }
            esse tipo de variável deixa de existir ao término
            do bloco.

    const -> Permite criar espaço em memória do tipo constante,
              ou seja, esse conteúdo não poderá sofrer mundanças durante
              o projeto.
              Dica: Se possível você pode criar essa const escrita em
              MAIUSCULO para facilitar a sua utilização. Pode ser criada
              de forma local ou global


   Operadores de comparação
   ==  -> Permite a comparação de dois conteúdos
   !=  -> Permite comparar a diferença de dois conteúdos
   <   -> Permite validar o valor menor
   >   -> Permite validar o valor maior
   <=  -> Permite validar se o valor é menor ou igual
   >=  -> Permite validar se o valor é maior ou igual
   === -> Permite comparar os conteudos e a igualdade da tipagem de dados
   !== -> Permite comparar a diferença de conteúdos e a igualdade de tipagem de dados
   =!= -> Permite comparar a igualdade de conteúdos e a diferença de tipagem de dados 
   E   -> AND -> &&
   OU  -> OR  -> ||
   NAO -> NOT -> !

 */


const readline = require('readline')

//Criação do objeto para captar as entradas de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Entrade de dados do nome
entradaDeDados.question('Digite o nome do aluno: ', function(nome){
    //Recebe o nome do aluno
    let nomeAluno = nome

    entradaDeDados.question('Digite a nota1: ', function(valor1){
        let nota1 = valor1

        entradaDeDados.question("Digite a nota2: ", function(valor2){
            let nota2 = valor2


            entradaDeDados.question("Digite a nota3: ", function(valor3){
                let nota3 = valor3


                entradaDeDados.question('Digite a nota4: ', function(valor4){
                    let nota4 = valor4


                    //Validação de entrada vazia
                    if(nomeAluno == '' || nota1 == '' || nota2 == '' || nota3 == '' || nota4 == ''){
                        console.log('ERRO: Campos obrigatórios nao foram prechidos')
                        //Validação de entrade do limite de numeros
                    }else if (nota1<0 || nota1>100 || nota2<0 || nota2>100 || nota3<0 || nota3>100 || nota4<0 || nota4>100){
                        console.log('ERRO: As notas devem ser de 0 até 100')
                        //Validação de entrade de somente numero
                    }else if(isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)){
                        console.log('ERRO: Somente numeros são permitidos na entrada das notas')
                    }
                })
            })
        })

    })

})
