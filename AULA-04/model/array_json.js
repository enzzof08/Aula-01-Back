/***************************************************************************
 * Objetivo: Manipular dados em ARRAY e JSON
 * Data: 05/03/2026
 * Autor: Marcel
 * Versão: 1.0
 *************************************************************************/

/*
    [ ] -> representa um objeto do tipo ARRAY
    { } -> representa um objeto do tipo JSON

    ARRAY ->  espaço na memória para armazenar dados sem a necessidade de criar outros objetos  (lista: horizontal)
        Ex:
            let nome  = 'José'
            let nome2 = 'Maria'
            let nome3 = 'João'

                indices    0        1        2
            let nomes = ['José', 'Maria', 'João']
    
    JSON -> É um espaço na memória para armazenar dados com CHAVE e VALOR    (tabela: vertical)
        Ex:
            let nome     =   'José'
            let telefone =   '123456789'
            let email    =   'jose@gmail.com'

                        Atributo
                            Chave     Valor    Chave       Valor     Chave     Valor
            let cliente = {"nome": "José", "telefone": "12345678", "email": "jose@gmail.com"}

*/

//Criando objetos do tipo ARRAY
const listaDeAlunos    = ['José', 'Maria', 'Luiz', 'Antônio', 'Carlos', 10, true]
const listaDeClientes  = []
const listaDeFornecedores = []

const exibirDados = function(){
    //Exibe o objeto ARRAY com o seu conteúdo
    console.log(listaDeAlunos)

    console.log(typeof(listaDeAlunos[6]))

    //Exibe o objeto ARRAY em formato de tabela , mostrando indice e conteudo
    console.table(listaDeAlunos)
    console.log(listaDeAlunos[3])
    console.log(listaDeAlunos[0])

    console.log(`O nome do aluno é ${listaDeAlunos[0]}`)
    console.log(`O nome do aluno é ${listaDeAlunos[1]}`)
    console.log(`O nome do aluno é ${listaDeAlunos[2]}`)
    console.log(`O nome do aluno é ${listaDeAlunos[3]}`)
    console.log(`O nome do aluno é ${listaDeAlunos[4]}`)

    //Usando o While
    console.log('\n*************** Exemplo com While *******************')
    let cont = 0
    while(cont<listaDeAlunos.length){
        console.log(`O nome do aluno é: ${listaDeAlunos[cont]}`)
        cont += 1           // cont = cont + 1
    }

    //Usando o FOR
    console.log('\n*******************Exemplo com FOR*******************')
    for(let contador = 0; contador < listaDeAlunos.length; contador++){
        console.log(`O nome do aluno é: ${listaDeAlunos[contador]}`)
    }

    //Usando o FOR EACH
    console.log('\n*****************Exemplo com FOR EACH******************')
    listaDeAlunos.forEach(function(aluno){
        console.log(`O nome do aluno é ${aluno}`)

    })

    //Usando o FOR OF
    console.log('\n******************Exemplo com FOR OF******************')
    for(aluno of listaDeAlunos){
        console.log(`O nome do aluno é: ${aluno}`)


    //Usando o FOR IN
    console.log('\n******************Exemplo com FOR IN******************')
    for(item in listaDeAlunos){
        console.log(`O nome do aluno é: ${listaDeAlunos[item]} `)
    }

    }
    console.log(listaDeAlunos.length)
}



const manipularDados = function(){
    listaDeClientes[0] = 'Jose da Silva'
    listaDeClientes[1] = 'Maria da Silva'
    listaDeClientes[2] = 'Luiz da Silva'
    listaDeClientes[3] = 'Ana da Silva'

    console.table(listaDeClientes)

    //Permite adicionar novos elementos no ARRAY, sempre no FINAL
    listaDeFornecedores.push('Antonio')
    listaDeFornecedores.push('Caio')
    listaDeFornecedores.push('Luiz')
    listaDeFornecedores.push('Hugo', 'Maria', 'José', 'André')

    console.log(listaDeFornecedores)
    
}

manipularDados()