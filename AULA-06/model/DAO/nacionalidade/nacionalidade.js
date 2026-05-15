/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da nacionalidade no banco de dados
 * Data: 15/05/2026
 * Autor: Enzzo
 * Versão: 1.0
 *********************************************************************************/

const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig.js')

const knexConection = knex(knexDatabaseConfig.development)


const insertNacionalidade = async function (dados) {
    try {
        let sql = `insert into tbl_nacionalidade (
            nacionalidade
        )values (
            '${dados.nacionalidade}'
        );`

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const selectALLNacionalidade = async function () {
    try {

        let sql = 'select * from tbl_nacionalidade order by id desc;'

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectByIdNacionalidade = async function(id){
    try {
        let sql = `select * from tbl_nacionalidade where id=${id};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        return false
    }

}

const updateNacionalidade = async function(nacionalidade){
    try {
        let sql = `update tbl_nacionalidade set
        nacionalidade           = '${nacionalidade.nacionalidade}'
        where id            = ${nacionalidade.id};`

        let result = await knexConection.raw(sql)
        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    insertNacionalidade,
    selectALLNacionalidade,
    selectByIdNacionalidade,
    updateNacionalidade

}