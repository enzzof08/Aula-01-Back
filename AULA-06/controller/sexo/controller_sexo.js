/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de sexo
 * Data: 20/05/2026
 * Autor: Enzzo
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const sexoDAO = require('../../model/DAO/sexo/sexo.js')

const inserirNovoSexo = async function (dados, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(dados)

            if (validar) {
                return validar
            } else {
                let result = await sexoDAO.insertSexo(await tratarDados(dados))
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

const listarSexo = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await sexoDAO.selectALLSexo()
        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.genero = result

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


const buscarSexo = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await sexoDAO.selectByIdSexo(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.sexo = result[0].sexo

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


const atualizarSexo = async function (dados, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarSexo = await buscarSexo(id)
            if (resultBuscarSexo.status) {

                let validar = await validarDados(dados)
                if (!validar) {
                    dados.id = Number(id)
                    let result = await sexoDAO.updateSexo(await tratarDados(dados))

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
                return resultBuscarClassificacao
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const excluirSexo = async function(id){
let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let resultBuscarSexo = await buscarSexo(id)

        if(resultBuscarSexo.status){
            let result = await sexoDAO.deleteSexo(id)
            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return resultBuscarClassificacao
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (dados) {
    let sexo = dados.sexo
    if (sexo == undefined || sexo == '' || sexo == null || sexo.length > 30 || !isNaN(sexo)) {
        customMessage.ERROR_BAD_REQUEST.field = '[SEXO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const tratarDados = async function (dados) {
    //Tratamento para eliminar a chegada da aspas ('') como caracter inválido
    dados.sexo = dados.sexo.replaceAll("'", "")

    return dados
}




module.exports = {
    inserirNovoSexo,
    listarSexo,
    buscarSexo,
    atualizarSexo,
    excluirSexo

}

