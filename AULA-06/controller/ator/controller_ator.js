/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD do ator
 * Data: 20/06/2026
 * Autor: Enzzo
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const atorDAO = require('../../model/DAO/ator/ator.js')

const controllerAtorNacionalidade = require('./controller_ator_nacionalidade.js')

const controllerSexo = require('../sexo/controller_sexo.js')


const inserirNovoAtor = async function (ator, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(ator)

            if (validar) {
                return validar
            } else {
                let result = await atorDAO.insertAtor(await tratarDados(ator))
                if (result) {

                    ator.id = result

                    for (itemNacionalidade of ator.nacionalidade) {


                        let atorNacionalidade = {
                            "id_ator": ator.id,
                            "id_nacionalidade": itemNacionalidade.id
                        }


                        let resultAtorNacionalidade = await controllerAtorNacionalidade.inserirNovoAtorNacionalidade(atorNacionalidade)

                        //Validação para verificar se todos os itens de relacionamento foram inseridos
                        if (!resultAtorNacionalidade.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING  //201 com alerta de cadastro
                        }

                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = ator

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarAtor = async function (ator, id, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para verificar se o conteúdo do Body é um JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função para buscar o filme e validar se o ID est correto, Se o ID existe no BD e se o filme existe
            let resultBuscarAtor = await buscarAtor(id)
            if (resultBuscarAtor.status) {

                //Chama a função para validar os dados no
                let validar = await validarDados(ator)
                if (!validar) {

                    //Adiciona um atributo ID no JSON de filme, para enviar ao DAO um único objeto
                    ator.id = Number(id)

                    //Chama a função para atualizar o filme no BD
                    let result = await atorDAO.updateAtor(await tratarDados(ator))

                    if (result) {

                        //Excluir as relações entre o Filme e os Generos (Tabela de relação)
                        let resultDeleteNacionalidades = await controllerAtorNacionalidade.excluirNacionalidadesIdAtor(ator.id)

                        if (resultDeleteNacionalidades.status) {
                            //Percorre o array de generos que chegará na requisição
                            for (itemNacionalidade of ator.nacionalidade) {


                                let atorNacionalidade = {
                                    "id_ator": ator.id,
                                    "id_nacionalidade": itemNacionalidade.id
                                }


                                let resultAtorNacionalidade = await controllerAtorNacionalidade.inserirNovoAtorNacionalidade(atorNacionalidade)

                                //Validação para verificar se todos os itens de relacionamento foram inseridos
                                if (!resultAtorNacionalidade.status) {
                                    return customMessage.SUCCESS_CREATED_ITEM_WARNING  //201 com alerta de cadastro
                                }

                            }
                        }

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = ator

                        return customMessage.DEFAULT_MESSAGE //200 (atualizado)

                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL  //500 (Model)   
                    }
                } else {
                    return validar  //400 de validação dos campos do banco de dados
                }

            } else {
                return resultBuscarAtor //400(ID inválido) ou 404(não encontrado) ou 500
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER  //500(controller)
    }
}

const listarAtor = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        //Chama a função do DAO para retornar a lista de filmes do BD
        let result = await atorDAO.selectALLAtor()

        //console.log(result)

        //Validação para verificar se o DAO conseguiu processar o script no BD
        if (result) {
            //Validação para verificar se o conteúdo do array tem dados de retorno ou se ta vazio
            if (result.length > 0) {

                //Manipulação dos dados da Classificação
                //Percorre o array de filmes
                for (ator of result) {
                    //Busca na controller da classificacao o ID referente a FK da classificacao
                    let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)

                    //Se encontrar o ID
                    if (resultSexo.status) {


                        ator.sexo = resultSexo.response.sexo

                        delete ator.id_sexo
                    }


                    let resultNacionalidades = await controllerAtorNacionalidade.buscarNacionalidadesIdAtor(ator.id)


                    if (resultNacionalidades.status) {

                        ator.nacionalidade = resultNacionalidades.response.ator_nacionalidade

                    }
                }


                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.ator = result

                return customMessage.DEFAULT_MESSAGE

            } else {
                return customMessage.ERROR_NOT_FOUND //404
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

const buscarAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400

        } else {
            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await atorDAO.selectByIdAtor(id)

            //Validação para verificar se o DAO retornou dados ou um FALSE(erro)
            if (result) {

                //Validação para verificar se o DAO tem algum dado no Array
                if (result.length > 0) {

                    //Manipulação dos dados da Classificação
                    //Percorre o array de filmes
                    for (ator of result) {
                        //Busca na controller da classificacao o ID referente a FK da classificacao
                        let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)

                        //Se encontrar o ID
                        if (resultSexo.status) {


                            ator.sexo = resultSexo.response.sexo

                            delete ator.id_sexo
                        }


                        let resultNacionalidades = await controllerAtorNacionalidade.buscarNacionalidadesIdAtor(ator.id)


                        if (resultNacionalidades.status) {

                            ator.nacionalidade = resultNacionalidades.response.ator_nacionalidade

                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator = result

                    return customMessage.DEFAULT_MESSAGE //200
                } else {
                    return customMessage.ERROR_NOT_FOUND //404
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }

}

const excluirAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {

        let resultBuscarAtor = await buscarAtor(id)

        if (resultBuscarAtor.status) {

            // Exclui as nacionalidades relacionadas ao ator
            let resultDeleteNacionalidades = await controllerAtorNacionalidade.excluirNacionalidadesIdAtor(id)

            if (resultDeleteNacionalidades.status) {

                // Agora exclui o ator
                let result = await atorDAO.deleteAtor(id)

                if (result)
                    return customMessage.SUCCESS_DELETED_ITEM
                else
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL

            } else {
                return resultDeleteNacionalidades
            }

        } else {
            return resultBuscarAtor
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function (ator) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (ator.nome == undefined || ator.nome == '' || ator.nome == null || ator.nome.length > 50) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (ator.data_nascimento == undefined || ator.data_nascimento == '' || ator.data_nascimento == null || ator.data_nascimento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE NASCIMENTO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    } else if (ator.biografia == undefined || ator.biografia == '' || ator.biografia == null) {
        customMessage.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    } else if (ator.imagem == undefined || ator.imagem == '' || ator.imagem == null || ator.imagem.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[IMAGEM] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

        // Validação para a FK do sexo
    } else if (ator.id_sexo == undefined || ator.id_sexo == '' || ator.id_sexo == null || isNaN(ator.id_sexo) || ator.id_sexo <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_SEXO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

//Função para tratar os dados a serem inseridos
const tratarDados = async function (ator) {
    //Tratamento para eliminar a chegada da aspas ('') como caracter inválido
    ator.nome = ator.nome.replaceAll("'", "")
    ator.data_nascimento = ator.data_nascimento.replaceAll("'", "")
    ator.biografia = ator.biografia.replaceAll("'", '')
    ator.imagem = ator.imagem.replaceAll("'", "")

    return ator
}

module.exports = {
    inserirNovoAtor,
    buscarAtor,
    listarAtor,
    atualizarAtor,
    excluirAtor
}