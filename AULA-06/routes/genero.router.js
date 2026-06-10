//Import do express
const express = require('express')
const bodyParser = require('body-parser')

//Permitindo a utilização do JSON no body das requisições
const bodyParserJSON = bodyParser.json()

//Cria um objeto de rota para os Endpoints de Genero
const router = express.Router()

//Import da Controller do Genero
const controllerGenero  = require('../controller/genero/controller_genero.js')


router.post('/', bodyParserJSON, async function(request, response){
    //Recebendo o body da requisição
    let dados = request.body

    //Recebendo o tipo de dados da requisição para validar se é JSON
    let contentType = request.headers['content-type']

    //chama a função de inserir e encaminha os dados do filme e o contentType
    let result = await controllerGenero.inserirNovaGenero(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)

})

router.get('/', async function(request,response){
    let result = await controllerGenero.listarGenero()
    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request,response){
    let id = request.params.id
    let result = await controllerGenero.buscarGenero(id)
    response.status(result.status_code)
    response.json(result)
})

router.put('/:id',bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerGenero.atualizarGenero(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)

})

router.delete('/:id', async function(request,response){
    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)
})

//Export do objeto de rotas do genero
module.exports = router