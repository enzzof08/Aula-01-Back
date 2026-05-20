/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do Ator no banco de dados
 * Data: 20/06/2026
 * Autor: Enzzo
 * Versão: 1.0
 *********************************************************************************/

//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertAtor = async function (dados) {
    try {
        let sql = `insert into tbl_ator (
            ator
        )values (
            '${dados.ator}'
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
    insertAtor
}