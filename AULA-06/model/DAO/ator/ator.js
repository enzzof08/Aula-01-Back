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

const insertAtor = async function (ator) {
    try {
        let sql = `insert into tbl_ator (
            nome,
            data_nascimento,
            biografia,
            imagem,
            id_sexo

        )values (
            '${ator.nome}',
            '${ator.data_nascimento}',
            '${ator.biografia}',
            '${ator.imagem}',
            '${ator.id_sexo}'
        );`

        let result = await knexConection.raw(sql)

        if (result) {
            return result[0].insertId
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