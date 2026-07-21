const configMessages = require('../modulo/configMessages.js')

const atorNacDAO = require('../../model/DAO/ator_nacionalidade/ator_nacionalidade.js')

const inserirNovoAtorNacionalidade = async function (atorNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(atorNacionalidade)

        if (validar) {
            return validar
        } else {
            let result = await atorNacDAO.insertAtorNacionalidade(atorNacionalidade)
            if (result) {
                atorNacionalidade.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = atorNacionalidade

                return customMessage.DEFAULT_MESSAGE //201
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const buscarAtorNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await atorNacDAO.selectByIdAtorNacionalidade(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator_nacionalidade = result

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

const buscarNacionalidadesIdAtor = async function (idAtor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (idAtor == undefined || String(idAtor).replaceAll(' ', '') == '' || idAtor == '' || idAtor == null || isNaN(idAtor) || idAtor <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_ATOR] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await atorNacDAO.selectNacionalidadesByIdAtor(idAtor)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator_nacionalidade = result

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

const excluirAtorNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let resultBuscarID = await buscarAtorNacionalidade(id)

        if (resultBuscarID.status) {
            let result = await atorNacDAO.deleteAtorNacionalidade(id)
            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarID
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const excluirNacionalidadesIdAtor = async function (idAtor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        
            let result = await atorNacDAO.deleteNacionalidadesByIdAtor(idAtor)
            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (atorNacionalidade) {
    if (atorNacionalidade.id_ator == undefined || atorNacionalidade.id_ator == '' || atorNacionalidade.id_ator == null || atorNacionalidade.id_ator <= 0 || isNaN(atorNacionalidade.id_ator)) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_ATOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (atorNacionalidade.id_nacionalidade == undefined || atorNacionalidade.id_nacionalidade == '' || atorNacionalidade.id_nacionalidade == null || atorNacionalidade.id_nacionalidade <= 0 || isNaN(atorNacionalidade.id_nacionalidade)) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}


module.exports = {
    inserirNovoAtorNacionalidade,
    buscarNacionalidadesIdAtor,
    excluirAtorNacionalidade,
    excluirNacionalidadesIdAtor
}