/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Enzzo
 * Versão: 1.0
 ***************************************************************************************************************/
//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

//Import das Controllers
const controllerClassificacao = require('../classificacao/controller_classificacao.js')

//Função para inserir um novo filme
const inserirNovoFilme = async function(filme, contentType){

    //Forma de criar uma cópia dos JSON do arquvio de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    console.log(contentType)
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função para validar a entrada dos dados do filme
            let validar = await validarDados(filme)
        
            //Retorna um JSON de erro caso algum atributo seja inválido,
            //senão retorna um false(Não teve erro)
            if(validar){
                return validar //400
            }else{

                //Encaminha os dados do Filme para o DAO inserir no BD
                let result = await filmeDAO.insertFilme(await tratarDados(filme))
                
        
                if(result){ //201
                    //Cria o ID no JSON do filme  e adiciona o ID gerado no DAO
                    filme.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filme
        
                    return customMessage.DEFAULT_MESSAGE //201
        
                }else{ //erro 500 (Model)
        
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
                }
                
            }
        }else{
            return customMessage.ERROR_CONTENT_TYPE //415
        }
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }


    
}

//Função para atualizar um filme existente
const atualizarFilme = async function(filme, id, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para verificar se o conteúdo do Body é um JSON
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função para buscar o filme e validar se o ID est correto, Se o ID existe no BD e se o filme existe
            let resultBuscarFilme = await buscarFilme(id)
                if(resultBuscarFilme.status){

                    //Chama a função para validar os dados no
                    let validar = await validarDados(filme)
                    if(!validar){

                        //Adiciona um atributo ID no JSON de filme, para enviar ao DAO um único objeto
                        filme.id = Number(id)

                        //Chama a função para atualizar o filme no BD
                        let result = await filmeDAO.updateFilme(await tratarDados(filme))

                        if(result){
                            customMessage.DEFAULT_MESSAGE.status      = customMessage.SUCCESS_UPDATE_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message     = customMessage.SUCCESS_UPDATE_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response    = filme

                            return customMessage.DEFAULT_MESSAGE //200 (atualizado)

                        }else{
                            return customMessage.ERROR_INTERNAL_SERVER_MODEL  //500 (Model)   
                        }
                    }else{
                        return validar  //400 de validação dos campos do banco de dados
                    }   

                }else{
                    return resultBuscarFilme //400(ID inválido) ou 404(não encontrado) ou 500
                }
        }else {
            return customMessage.ERROR_CONTENT_TYPE
        }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER  //500(controller)
    }
}

//Função para retornar todos os filmes existentes
const listarFilme = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        //Chama a função do DAO para retornar a lista de filmes do BD
        let result = await filmeDAO.selectALLFilme()

        //console.log(result)

        //Validação para verificar se o DAO conseguiu processar o script no BD
        if(result){
            //Validação para verificar se o conteúdo do array tem dados de retorno ou se ta vazio
            if(result.length > 0){

                //Manipulação dos dados da Classificação
                //Percorre o array de filmes
                for (filme of result){
                    //Busca na controller da classificacao o ID referente a FK da classificacao
                    let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)

                    //Se encontrar o ID
                    if(resultClassificacao.status){
                        //Adicionar um atributo classificação no JSON do filme e colocar o resultado com os dados da classificação
                        filme.classificacao = resultClassificacao.response.classificacao
                        //Apaga o id_classificação do JSON de filme
                        delete filme.id_classificacao
                    }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE
                
            }else{
                return customMessage.ERROR_NOT_FOUND //404
            }
        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if(id == undefined || String(id).replaceAll(' ', '') == ''|| id == '' || id == null ||  isNaN(id) || id <= 0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400
            
        }else{
            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await filmeDAO.selectByIdFilme(id)

            //Validação para verificar se o DAO retornou dados ou um FALSE(erro)
            if(result){

                //Validação para verificar se o DAO tem algum dado no Array
                if(result.length > 0){

                //Manipulação dos dados da Classificação
                //Percorre o array de filmes
                for (filme of result){
                    //Busca na controller da classificacao o ID referente a FK da classificacao
                    let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)

                    //Se encontrar o ID
                    if(resultClassificacao.status){
                        //Adicionar um atributo classificação no JSON do filme e colocar o resultado com os dados da classificação
                        filme.classificacao = resultClassificacao.response.classificacao
                        //Apaga o id_classificação do JSON de filme
                        delete filme.id_classificacao
                    }
                }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE //200
                }else{
                    return customMessage.ERROR_NOT_FOUND //404
                }
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//Função para excluir um filme
const excluirFilme = async function(id){
let customMessage = JSON.parse(JSON.stringify(configMessages))
try {
    //Chama a funçao de buscar filme para validar se o filme existe
    let resultBuscarFilme = await buscarFilme(id)

    //Validação
    if(resultBuscarFilme.status){
        //Chama a função do DAO para excluir o filme
        let result = await filmeDAO.deleteFilme(id)

        if(result)
            return customMessage.SUCCESS_DELETED_ITEM //200 ou 204
        else
            return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 Model

    }else{
        return resultBuscarFilme
    }
} catch (error) {
    return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 Controller
}
}

//Função para validar os dados de cadastro do Filme
const validarDados = async function(filme){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if(filme.nome == undefined || filme.nome == '' || filme.nome == null ||  filme.nome.length > 80){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.sinopse == undefined || filme.sinopse == '' || filme.sinopse == null){
        customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.capa == undefined ||  filme.capa == '' || filme.capa == null || filme.capa.length > 255){
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.data_lancamento == undefined || filme.data_lancamento == '' || filme.data_lancamento == null ||  filme.data_lancamento.length != 10){
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.duracao == undefined || filme.duracao == '' || filme.duracao == null ||  filme.duracao.length < 5){
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5){
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    // Validação para a FK da classificacao
    }else if (filme.id_classificacao == undefined || filme.id_classificacao == '' || filme.id_classificacao == null ||isNaN(filme.id_classificacao) || filme.id_classificacao <=0){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_CLASSIFICACAO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }
}

//Função para tratar os dados a serem inseridos
const tratarDados = async function(filme){
        //Tratamento para eliminar a chegada da aspas ('') como caracter inválido
        filme.nome            = filme.nome.replaceAll("'", "")
        filme.sinopse         = filme.sinopse.replaceAll("'", "")
        filme.capa            = filme.capa.replaceAll("'", '')
        filme.data_lancamento = filme.data_lancamento.replaceAll("'", "")
        filme.duracao         = filme.duracao.replaceAll("'", "")
        filme.valor           = filme.valor.replaceAll("'", "")
        filme.avaliacao       = filme.avaliacao.replaceAll("'", "")

        return filme
}



module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}