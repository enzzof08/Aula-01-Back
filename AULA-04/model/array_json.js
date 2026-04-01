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
    listaDeClientes[5] = 'Beatriz da Silva'

    console.table(listaDeClientes)

    //Permite adicionar novos elementos no ARRAY, sempre no FINAL
    listaDeFornecedores.push('Antonio')
    listaDeFornecedores.push('Caio')
    listaDeFornecedores.push('Luiz')
    listaDeFornecedores.push('Hugo', 'Maria', 'José', 'André')

    console.table(listaDeFornecedores)
    //Permite adicionar novos elementos no ARRAY, sempre no INICIO
    //Após adicionar o elemento, ele reorganiza todos os outros itens
    listaDeFornecedores.unshift('Luciano')

    //Permite adicionar um novo elemento em uma determinada posição do ARRAY
                     //splice(indice, qtdeDeElementosRmvd, 'Novo conteúdo')
    listaDeFornecedores.splice(3,0,'Bernardo')

    console.table(listaDeFornecedores)
    
    //Permite remover um determinado indice do elemento do ARRAY
                    //splice(indice, qtde de elementos a ser removido)
    listaDeFornecedores.splice(6,1)
    console.table(listaDeFornecedores)

    //Permite remover o ultimo elemento do ARRAY
    listaDeFornecedores.pop()
    console.table(listaDeFornecedores)

    //Permite remover o primeiro elemento do ARRAY
    //Após ele remover, irá reorganizar todos os elementos
    listaDeFornecedores.shift()
    console.table(listaDeFornecedores)
}

const removerItem = function(nomeAluno){

        //indexOf() -> Retorna o indice referente ao conteúdo que esta sendo pesquisado
    // let indice = (listaDeAlunos.indexOf(nomeAluno))
    // listaDeAlunos.splice(indice,1)
    

    // for(cont in listaDeAlunos){
    //     if(nomeAluno == listaDeAlunos[cont]){
    //         listaDeAlunos.splice(cont,1)
    //     }
    // }

    let cont = 0
    let qtd = listaDeAlunos.length
    while(cont < qtd){
        if(nomeAluno == listaDeAlunos[cont]){
            listaDeAlunos.splice(cont,1)
        }
        cont++
    }

}

const verificarItem = function(nomeAluno){
    //Verifica se o conteúdo existe dentro do ARRAY e retorna(true/false)
    return (listaDeAlunos.includes(nomeAluno))
}

const manipularDadosJSON = function(){
    //Criando um objeto JSON
        //A estrutura do JSON é Chave (atributo) : Valor(conteúdo)
    let aluno = {"id" : 1, "nome" : "José da silva" , "ra" : 123456, "email" : "jose@gmail.com"}

    //Exibe o objeto JSON
    console.log(aluno)
    console.table(aluno)

    //Exibe o conteúdo de um atributo do JSON
    console.log(aluno.email)
    console.log(aluno.nome)

    //adiciona um novo atributo no JSON já existente
    aluno.telefone = '(11)94704-3268'
    aluno.data_nascimento = '08/11/2008'
    aluno.nota = null

    console.log(aluno)

    //Remove um atributo do JSON
    delete aluno.email
    console.log(aluno)
}

const cadastroDeProdutos = function(){
    let cores = [
                    {"id":1, "cor":"Branco",  "hexa": "#ffffff"},  //0
                    {"id":2, "cor":"Preto",   "hexa" : "#000000"}, //1
                    {"id":3, "cor":"Azul",    "hexa":"#0000ff"},   //2
                    {"id":4, "cor":"Amarelo", "hexa":"ffff00"},    //3
                    {"id":5, "cor":"Rosa",    "hexa": "ffb5c0"}    //4

                ]


    // cores.forEach(function(itemCor){
    //     console.log(itemCor.cor)
    // })

    let marcas = [

                    {"id": 1, "marca": "Logitech", "telefone":"(11)12452-3871",  "email":"logitech@gmail.com"}, //1
                    {"id": 2, "marca": "Intel",    "telefone":"(11)68232-4094",  "email":"intel@gmail.com"},    //2
                    {"id": 3, "marca": "Dell",     "telefone":"(11)89237-3123",  "email":"dell@gmail.com"},     //3
                    {"id": 4, "marca": "Apple",    "telefone":"(11)91712-1284",  "email":"apple@gmail.com"},    //4
                    {"id": 5, "marca": "Samsung",  "telefone":"(11)12462-0121",  "email":"samsung@gmail.com"},  //5
                    {"id": 6, "marca": "Asus",     "telefone":"(11)12452-3871",  "email":"asus@gmail.com"}      //6

                ]
                    // marcas.forEach(function(itemMarca){
                    //     console.log(itemMarca.marca)
                    // })

    let produtos = [
        {"id":1,
            "nome":"Monitor",
            "descricao":"Monitor de 27 Polegadas",
            "valor":1500,
            "qtde":20,
            "cor":[
                cores[0],
                cores[1]
            ],
            "marca":[
                marcas[1].marca
            ]
            
        },
        {
            "id":2,
            "nome":"Teclado",
            "descricao":"Teclado Mecânico RGB",
            "valor":250,
            "qtde":500,
            "cor":cores,
            "marca":[
                marcas[3].marca,
                marcas[4].marca,
                marcas[5].marca

            ]
        },
        {
            "id":3,
            "nome":"Mouse",
            "descricao":"Mouse sem fio",
            "valor":60,
            "qtde":160,
            "cor":[
                cores[1],
                cores[2],
                cores[3]

            ],
            "marca":[
                marcas[1].marca,
                marcas[3].marca,
                marcas[4].marca,
                marcas[5].marca

            ]
        }

    ]


    //Permite extrair os produtos
    produtos.forEach(function(itemP){
        console.log("\nProduto: "+itemP.nome)
        console.log("Qtde: "+itemP.qtde)
        console.log("Valor: " + itemP.valor)

        //Permite extrair as cores dentro de cada produto
        itemP.cor.forEach(function(itemCor){
            console.log("   Cor: "+ itemCor.cor)
        })

        //Permite extrair as marcas de cada produto
        itemP.marca.forEach(function(itemMarca){
            console.log("   Marca: " + itemMarca)
        })
    })

    //Filtrando produtos pelo NOME
    console.log('\nExemplo de como pesquisar um produto pelo nome')

    let nomeProduto = 'Monitor'
    produtos.forEach(function(itemProduto){
        if(String(nomeProduto).toUpperCase() == String(itemProduto.nome).toUpperCase()){
            console.log(itemProduto)
        }
    })

    //Filtrando produtos pela COR
    console.log('\nExemplo de como pesquisar pela cor do produto')
    let corProduto = 'Azul'
    produtos.forEach(function(itemProduto){
        itemProduto.cor.forEach(function(itemCor){
            if(String(corProduto).toUpperCase() == String(itemCor.cor).toUpperCase){
                console.log(itemProduto)
            }
        })
    })

    // console.log(produtos)
     //console.table(produtos)

    //console.log(produtos[0].cor[1].cor)

    //Exibindo todas as cores referente ao produto "MONITOR"
    // produtos[0].cor.forEach(function(itemCor){
    //     console.log(itemCor.cor)
    // })





    // let cont = 0
    // let qtd = produtos[0].cor.length
    // while(cont < qtd){
    //     console.log()
    // }

    //console.log(cores[2].cor)
    //console.table(cores)
}   

cadastroDeProdutos()

// console.table(listaDeAlunos)
// removerItem('Luiz')
// console.table(listaDeAlunos)
//console.log(verificarItem('José'))