/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do genero no banco de dados
 * Data: 15/04/2026
 * Autor: Enzzo
 * Versão: 1.0
 *********************************************************************************/

const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig.js')

const knexConection = knex(knexDatabaseConfig.development)

const insertGenero = async function (dados) {
    try {
        let sql = `insert into tbl_genero (
            classificacao
        )values (
            ${dados.genero}
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

module.exports = {
    insertGenero
}
