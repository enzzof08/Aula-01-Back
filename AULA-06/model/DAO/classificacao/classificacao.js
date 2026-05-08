/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da classificação no banco de dados
 * Data: 15/04/2026
 * Autor: Enzzo
 * Versão: 1.0
 *********************************************************************************/

//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertClassificacao = async function(classificacao){
    try {
        let sql = `insert into tbl_classificacao (
            classificacao
        )values (
            ${classificacao}
        );`

        let result =  await knexConection.raw(sql)

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
    insertClassificacao
}


