/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de nacionalidade
 * Data: 17/04/2026
 * Autor: Enzzo
 * Versão: 1.0
 ***********************************************************************************************************************/

const configMessages = require('../modulo/configMessages.js')

const nacDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')

const inserirNovaNacionalidade = async function (dados, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(dados)

            if (validar) {
                return validar
            } else {
                let result = await nacDAO.insertNacionalidade(await tratarDados(dados))
                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = dados

                    return customMessage.DEFAULT_MESSAGE 
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL 
                }
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarNacionalidade = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await nacDAO.selectALLNacionalidade()
        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.nacionalidade = result

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_NOT_FOUND
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarNacionalidade = async function (id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST 
        } else {
            let result = await nacDAO.selectByIdNacionalidade(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidade = result

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_NOT_FOUND
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }    
}

const atualizarNacionalidade = async function (dados, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarNacionalidade = await buscarNacionalidade(id)
            if (resultBuscarNacionalidade.status) {

                let validar = await validarDados(dados)
                if (!validar) {
                    dados.id = Number(id)
                    let result = await nacDAO.updateNacionalidade(await tratarDados(dados))
                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = dados
                        return customMessage.DEFAULT_MESSAGE
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarNacionalidade
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const excluirNacionalidade = async function(id){
let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let resultBuscarNacionalidade = await buscarNacionalidade(id)

        if(resultBuscarNacionalidade.status){
            let result = await nacDAO.deleteNacionalidade(id)
            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return resultBuscarNacionalidade
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (dados) {
    let nacionalidade = dados.nacionalidade
    if (nacionalidade == undefined || nacionalidade == '' || nacionalidade == null || nacionalidade.length > 30 || !isNaN(nacionalidade)) {
        customMessage.ERROR_BAD_REQUEST.field = '[NACIONALIDADE] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const tratarDados = async function (dados) {
    //Tratamento para eliminar a chegada da aspas ('') como caracter inválido
    dados.nacionalidade = dados.nacionalidade.replaceAll("'", "")

    return dados
}

module.exports = {
    inserirNovaNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade
}