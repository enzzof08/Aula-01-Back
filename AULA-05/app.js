/*****************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de Estados e Cidades
 * Data: 01/04/2026
 *  Autor: Enzzo
 * Versão: 1.0
 ****************************************************************************************/

/****
 * Para configurar a API:
 * Instalar o EXPRESS  -> npm install express --save
 *     Dependencia para configurar e utilizar o protocolo HTTP para criar a API
 * 
 * Instalar o CORS     -> npm install cors --save
 *     Dependencia para configurar as permissões de acesso da API
 */


//Import das dependencias para criar a API
const express = require('express')
const cors = require('cors')

//Criando um objeto do express para criar a API
const app = express()

//Configuração do CORS da API
const corsOptions = {
    origin: ['*'],   //Configuração da origem da requisição (IP ou Dominio)
    methods: 'GET',  //Configuração dos verbos que serão ultilizados na API
    allowedHeaders: ['Content-type', 'Authorization'] //Configurações de permissões
    //Tipo de dados   //Autorização de acesso

}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

//Import do arquivo de funções
const estadosCidades = require('./model/funcoes.js')

//Retorna uma lista de estados
app.get('/v1/senai/estados', function (request, response) {
    let estados = estadosCidades.getListaDeEstados()
    response.status(200) //Requisição bem sucedida!!!
    response.json(estados)
})

//Retorna dados de um estado filtrando pela sigla do estado
app.get('/v1/senai/dados/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)
    if (estado) {
        response.status(200)
        response.json(estado)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado foi encontrado" })
    }
})

//Retorna dados da capital filtrando pela sigla  do estado
app.get('/v1/senai/capital/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let capital = estadosCidades.getCapitalEstado(sigla)
    if (capital) {
        response.status(200)
        response.json(capital)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado foi encontrado" })
    }
})

//Retorna os estados filtrando pela região
app.get('/v1/senai/estados/regiao/:regiao', function (request, response) {
    let regiao = request.params.regiao
    let estadoRegioes = estadosCidades.getEstadosRegiao(regiao)
    if (estadoRegioes) {
        response.status(200)
        response.json(estadoRegioes)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado foi encontrado" })
    }
})

//Retorna os estados que foram capital do Brasil
app.get('/v1/senai/estados/capital/brasil', function (request, response) {
    let capitais = estadosCidades.getCapitalPais()
    response.json(capitais)
    response.status(200)
})

//Retorna as cidades filtrando pela sigla do estado
app.get('/v1/senai/cidades/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let cidadesEstado = estadosCidades.getCidades(sigla)
    if (cidadesEstado) {
        response.status(200)
        response.json(cidadesEstado)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado foi encontrado" })
    }
})

app.get('/v1/senai/help', function(request, response){
    let docAPI = {
        "api-description":"API para manipular dados de Estados e Cidades",
        "data":"2026-04-02",
        "development":"Enzzo Fernandes da Chagas",
        "version": 1.0,
        "endpoints":[
            {   "rota1":"/v1/senai/estados",
                "description":"Retorna a lista de todos os estados"
            },
            {   "rota2":"/v1/senai/dados/estado/sp",
                "description":"Retorna dados de um estado filtrando pela sigla"
            },
            {   "rota3":"/v1/senai/capital/estado/sp",
                "description":"Retorna dados da capital de um estado filtrando pela sigla"
            },
            {   "rota4":"/v1/senai/estados/regiao/sul",
                "description":"Retorna os estados filtrando pela região"
            },
            {   "rota5":"/v1/senai/estados/capital/brasil",
                "description":"Retorna os estados que foram capitais do Brasil"
            },
            {   "rota6":"/v1/senai/cidades/estado/rj",
                "description":"Retorna as cidades filtrando pela sigla do estado"
            }
        ]
    }
    response.status(200)
    response.json(docAPI)
})

//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições ...')
})