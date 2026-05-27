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
const controllerFilme           = require('./controller/filme/controller_filme.js')
const controllerClassificacao   = require('./controller/classificacao/controller_classificacao.js')
const controllerGenero          = require('./controller/genero/controller_genero.js')
const controllerNacionalidade   = require('./controller/nacionalidade/controller_nacionalidade.js')
const controllerSexo            = require('./controller/sexo/controller_sexo.js')
const controllerAtor            = require('./controller/ator/controller_ator.js')

//ENDPOINTS

//Filme
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

    //Chama a função para atualizar o filme, devemos encaminhar as 3 variáveis na mesma sequencia que a função foi criada
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)


    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/filme/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)


})

//Classificacao
app.post('/v1/senai/locadora/classificacao', bodyParserJSON, async function(request,response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/classificacao', async function(request,response){
    let result = await controllerClassificacao.listarClassificacao()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/classificacao/:id', async function(request,response){
    let id = request.params.id
    let result = await controllerClassificacao.buscarClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/classificacao/:id',bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerClassificacao.atualizarClassificacao(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/classificacao/:id', async function(request,response){
    let id = request.params.id

    let result = await controllerClassificacao.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

//Genero
app.post('/v1/senai/locadora/genero', bodyParserJSON, async function(request, response){
    //Recebendo o body da requisição
    let dados = request.body

    //Recebendo o tipo de dados da requisição para validar se é JSON
    let contentType = request.headers['content-type']

    //chama a função de inserir e encaminha os dados do filme e o contentType
    let result = await controllerGenero.inserirNovaGenero(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/genero', async function(request,response){
    let result = await controllerGenero.listarGenero()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero/:id', async function(request,response){
    let id = request.params.id
    let result = await controllerGenero.buscarGenero(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/genero/:id',bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerGenero.atualizarGenero(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/genero/:id', async function(request,response){
    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)
})


//Nacionalidade
app.post('/v1/senai/locadora/nacionalidade', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNacionalidade.inserirNovaNacionalidade(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/nacionalidade', async function(request,response){
    let result = await controllerNacionalidade.listarNacionalidade()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/nacionalidade/:id', async function(request,response){
    let id = request.params.id
    let result = await controllerNacionalidade.buscarNacionalidade(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/nacionalidade/:id',bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/nacionalidade/:id', async function(request,response){
    let id = request.params.id

    let result = await controllerNacionalidade.excluirNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})


//Sexo
app.post('/v1/senai/locadora/sexo', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerSexo.inserirNovoSexo(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/locadora/sexo', async function(request,response){
    let result = await controllerSexo.listarSexo()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/sexo/:id', async function(request,response){
    let id = request.params.id
    let result = await controllerSexo.buscarSexo(id)
    response.status(result.status_code)
    response.json(result)
   
})

app.put('/v1/senai/locadora/sexo/:id',bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerSexo.atualizarSexo(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

app.delete('/v1/senai/locadora/sexo/:id', async function(request,response){
    let id = request.params.id

    let result = await controllerSexo.excluirSexo(id)

    response.status(result.status_code)
    response.json(result)
})


//Ator
app.post('/v1/senai/locadora/ator', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerAtor.inserirNovoAtor(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)

})


//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições ...')
})