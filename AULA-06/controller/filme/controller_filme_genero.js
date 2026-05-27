/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de filme genero
 * Data: 17/04/2026
 * Autor: Enzzo
 * Versão: 1.0
 ***************************************************************************************************************/

const configMessages = require('../modulo/configMessages.js')

const filmeGenDAO = require('../../model/DAO/filme_genero/filme_genero.js')

const inserirNovoFilmeGenero = async function (filmeGenero) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(filmeGenero)

        if (validar) {
            return validar
        } else {
            let result = await filmeGenDAO.insertFilmeGenero(filmeGenero)
            if (result) {
                filmeGenero.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = filmeGenero

                return customMessage.DEFAULT_MESSAGE //201
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const listarFilmeGenero = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await filmeGenDAO.selectALLFilmeGenero()
        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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

const buscarFilmeGenero = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await filmeGenDAO.selectByIdFilmeGenero(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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

//Função para buscar os generos filtrando pelo ID do Filme
const buscarGenerosIdFilme = async function (idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (idFilme == undefined || String(idFilme).replaceAll(' ', '') == '' || idFilme == '' || idFilme == null || isNaN(idFilme) || idFilme <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await filmeGenDAO.selectGenerosByIdFilme(idFilme)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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

//Função para buscar os filmes filtrando pelo ID do Genero
const buscarFilmesIdGenero = async function (idGenero) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (idGenero == undefined || String(idGenero).replaceAll(' ', '') == '' || idGenero == '' || idGenero == null || isNaN(idGenero) || idGenero <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await filmeGenDAO.selectFilmesByIdGenero(idGenero)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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

const atualizarFilmeGenero = async function (filmeGenero, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let resultBuscarID = await buscarFilmeGenero(id)
        if (resultBuscarID.status) {

            let validar = await validarDados(filmeGenero)
            if (!validar) {
                filmeGenero.id = id
                let result = await filmeGenDAO.updateGenero(await tratarDados(dados))
                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeGenero
                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return resultBuscarID
        }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const excluirFilmeGenero = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let resultBuscarID = await buscarFilmeGenero(id)

        if (resultBuscarID.status) {
            let result = await filmeGenDAO.deleteFilmeGenero(id)
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

//Função para excluir a relação de generos com o Filme
const excluirGenerosIdFilme = async function (idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        
            //Chamar a função do DAO para excluir o genero
            let result = await filmeGenDAO.deleteGenerosByIdFilme(idFilme)
            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (filmeGenero) {
    if (filmeGenero.id_filme == undefined || filmeGenero.id_filme == '' || filmeGenero.id_filme == null || filmeGenero.id_filme <= 0 || isNaN(filmeGenero.id_filme)) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (filmeGenero.id_genero == undefined || filmeGenero.id_genero == '' || filmeGenero.id_genero == null || filmeGenero.id_genero <= 0 || isNaN(filmeGenero.id_genero)) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const tratarDados = async function (dados) {
    //Tratamento para eliminar a chegada da aspas ('') como caracter inválido
    dados.genero = dados.genero.replaceAll("'", "")

    return dados
}


module.exports = {
    inserirNovoFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    buscarFilmesIdGenero,
    buscarGenerosIdFilme,
    excluirGenerosIdFilme
}

