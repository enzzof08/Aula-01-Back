/*************************************************************************
 * Objetivo: Criar uma aplicação que realiza calculos de Juros utilizando
 * Funções para modularizar o código
 * Autor: Enzzo
 * Data: 11/02/2026
 * Versão: 1.0
 *************************************************************************/

const readline = require('readline')
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
//Entrada do nome do produto
entradaDeDados.question('Digite o nome do Cliente: ', function (nome) {
    let nomeCliente = nome

    //Entrada do valor da compra
    entradaDeDados.question('Digite o nome do Produto: ', function (produto) {
        let nomeProduto = produto

        //Entra valor do produto
        entradaDeDados.question('Digite o valor do produto: ', function (valor) {
            let valorCompra = valor

            //Entrada da taxa de juros
            entradaDeDados.question('Digite a taxa de juros: ', function (taxa) {
                let taxaJuros = taxa

                //Entrada da qtde de parcelas
                entradaDeDados.question('Digite a quantidade de parcelas: ', function (parcelas) {
                    let qtdeParcelas = parcelas
                    let calculos = require('./modulo/calculos')

                
                    let montante = calculos.calcularJurosCompostos(valorCompra, taxaJuros, qtdeParcelas)
                    
                    if(montante){
                        console.log('o valor final é: '+ montante)
                    }else{
                        console.log ('ERRO: Não foi possível processar o calculo.')
                        entradaDeDados.close()
                    }
                    


                })

            })

        })

    })
})




