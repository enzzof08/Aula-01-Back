const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const clasDAO = require('../../model/DAO/classificacao/classificacao.js')

//Função para inserir uma novo classificacao
const inserirNovaClassificacao = async function(classif, contentType){
    let classificacao = classif.classificacao
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDados(classificacao)

            if(validar){
                return validar
            }else{
                let result = clasDAO.insertClassificacao(classificacao)

                if(result){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = classif
        
                    return customMessage.DEFAULT_MESSAGE //201
                }else{
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

const validarDados = async function(classificacao){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if(classificacao != 'L' && classificacao != '6' && classificacao != '10' && classificacao != '12' && classificacao != '14' && classificacao != '16' && classificacao != '18'){
        customMessage.ERROR_BAD_REQUEST.field = '[CLASSIFICAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }
}

module.exports = {
    inserirNovaClassificacao
}