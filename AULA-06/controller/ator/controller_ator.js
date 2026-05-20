/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD do ator
 * Data: 20/06/2026
 * Autor: Enzzo
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const atorDAO = require('../../model/DAO/ator')


// const inserirNovoAtor = async function (dados, contentType) {
//     let customMessage = JSON.parse(JSON.stringify(configMessages))

//     try {
//         if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

//             let validar = await validarDados(dados)

//             if (validar) {
//                 return validar
//             } else {
//                 let result = await sexoDAO.insertSexo(await tratarDados(dados))
//                 if (result) {
//                     customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
//                     customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
//                     customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
//                     customMessage.DEFAULT_MESSAGE.response = dados

//                     return customMessage.DEFAULT_MESSAGE 
//                 } else {
//                     return customMessage.ERROR_INTERNAL_SERVER_MODEL 
//                 }
//             }
//         } else {
//             return customMessage.ERROR_CONTENT_TYPE
//         }
//     } catch (error) {
//         return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
//     }
// }


const validarDados = async function (ator) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if(ator.nome == undefined || ator.nome == '' || ator.nome == null ||  ator.nome.length > 50){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(ator.data_nascimento == undefined || ator.data_nascimento == '' || ator.data_nascimento == null ||  filme.data_lancamento.length != 10){
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE NASCIMENTO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    }else if(ator.biografia == undefined ||  ator.biografia == '' || ator.biografia == null){
        customMessage.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    }else if(ator.imagem == undefined || ator.imagem == '' || ator.imagem == null ||  ator.imagem.length > 255){
        customMessage.ERROR_BAD_REQUEST.field = '[IMAGEM] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    // Validação para a FK do sexo
    }else if (ator.id_sexo == undefined || ator.id_sexo == '' || ator.id_sexo == null ||isNaN(ator.id_sexo) || ator.id_sexo <=0){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_SEXO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }
}

//Função para tratar os dados a serem inseridos
const tratarDados = async function(ator){
    //Tratamento para eliminar a chegada da aspas ('') como caracter inválido
    ator.nome             = ator.nome.replaceAll("'", "")
    ator.data_nascimento       = ator.data_nascimento.replaceAll("'", "")
    ator.biografia           = ator.biografia.replaceAll("'", '')
    ator.imagem             = ator.imagem.replaceAll("'", "")

    return ator
}