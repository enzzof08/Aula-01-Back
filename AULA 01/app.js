// Comentário em Linha
/*
Comentário
   em
Bloco
*/

// Permite exibir um coneúdo no terminal
console.log("Testando o JS")

//Permite a criação de uma variável
var nome = "Enzzo"

console.log(nome)

//Concatemação de dados (texto e variavel)
console.log("O nome do usuário é: "+ nome)
console.log(`O nome do usuário é: ${nome}`)

//Import da biblioteca do readline
//readline -> serve para permitir a entrada de dados via terminal
var readline = require('readline')

//Cria um objeto especialista em entada de dados pelo terminal
var entradaDeDados = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
})

//Permiete a entrada de dados do nome usuário
//question -> utiliza uma função de CALLBACK para devolver o valor digitado
//CALLBACK -> É uma função particular de um método, que é chamada para
// encaminhar um conteudo para o desenvolvedor  esse conteudo vem atraves
// da variável no argumento "nomeUsuario"
entradaDeDados.question("Digite seu nome: ",function(nomeUsuario){
    console.log("O nome digitado foi: " + nomeUsuario)

    entradaDeDados.question("Digite seu email", function(emailUsuario){
        console.log(`O email do usuáio ${nomeUsuario} é: ${emailUsuario}`)
    })

})
