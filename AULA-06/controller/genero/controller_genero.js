/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de genero
 * Data: 17/04/2026
 * Autor: Enzzo
 * Versão: 1.0
 ***************************************************************************************************************/

const configMessages = require('../modulo/configMessages.js')

const genDAO = require('../../model/DAO/genero/genero.js')
const inserirNovaClassificacao = async function (dados, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = validarDados(dados)
            if(validar){
                return validar
            }else{
                let result = genDAO.insertGenero(dados)
                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = dados

                    return customMessage.DEFAULT_MESSAGE //201
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}


const validarDados = async function (dados){
    let genero = dados.genero
    if(genero == undefined || genero == '' || genero == null || genero.length > 30 || !isNaN(genero)){
        customMessage.ERROR_BAD_REQUEST.field = '[GENERO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }
}


