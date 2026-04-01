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

app.get('/v1/senai/estados', function (request, response) {
    let estados = estadosCidades.getListaDeEstados()
    response.json(estados)
    response.status(200) //Requisição bem sucedida!!!
})

app.get('/v1/senai/dados/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)
    if (estado) {
        response.json(estado)
        response.status(200)
    } else {
        response.json({ "message": "Nenhum estado foi encontrado" })
        response.status(404)
    }
})

app.get('/v1/senai/capital/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let capital = estadosCidades.getCapitalEstado(sigla)
    if(capital){
        response.json(capital)
        response.status(200)
    }else{
        response.json({"message": "Nenhum estado foi encontrado"})
        response.status(404)
    }
})

app.get('/v1/senai/regiao/estados/:regiao', function(request, response){
    let regiao = request.params.regiao
    let estadoRegioes = estadosCidades.getEstadosRegiao(regiao)
    if(estadoRegioes){
        response.json(estadoRegioes)
        response.status(200)
    }else{
        response.json({"message": "Nenhum estado foi encontrado"})
        response.status(404)
    }
})

app.get('/v1/senai/capital/pais',function(request,response){
    let capitais = estadosCidades.getCapitalPais
    response.json(capitais)
    response.status(200)
})

app.get('/cidades', function (request, response) {
    response.json({ "message": "Testando API de cidades" })
})
//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições ...')
})