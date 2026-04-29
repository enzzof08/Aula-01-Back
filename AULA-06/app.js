//Import das dependencias para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Permitindo a utilização do JSON no body das requisições
const bodyParserJSON = bodyParser.json()

//Criando um objeto do express para criar a API
const app = express()

//Configuração do CORS da API
const corsOptions = {
    origin: ['*'],   //Configuração da origem da requisição (IP ou Dominio)
    methods: 'GET, POST, PUT, DELETE, OPTIONS',  //Configuração dos verbos que serão ultilizados na API
    allowedHeaders: ['Content-type', 'Authorization'] //Configurações de permissões
    //Tipo de dados   //Autorização de acesso

}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

//Import das controllers do projeto
const controllerFilme = require('./controller/filme/controller_filme.js')

//ENDPOINTS
app.post('/v1/senai/locadora/filme',bodyParserJSON, async function(request, response){
    //Recebendo o body da requisição
    let dados = request.body

    //Recebendo o tipo de dados da requisição para validar se é JSON
    let contentType = request.headers['content-type']

    //chama a função de inserir e encaminha os dados do filme e o contentType
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme', async function(resquest, response){
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/filme/:id',bodyParserJSON, async function(request, response){
    
    //Recebe o content-type da requisição, para voltae se é JSON
    let contentType = request.headers['content-type']

    //Recebe o ID do registro a ser atualizado
    let id = request.params.id

    //Recebe os dados do body, que serão modificados no BD
    let dados = request.body

    console.log(contentType)

    //Chama a função para atualizar o filme, devemos encaminhar as 3 variáveis na mesma sequencia que a função foi criada
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)


    response.status(result.status_code)
    response.json(result)

})


//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições ...')
})