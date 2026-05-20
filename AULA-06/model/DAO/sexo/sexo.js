/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do sexo no banco de dados
 * Data: 20/05/2026
 * Autor: Enzzo
 * Versão: 1.0
 *********************************************************************************/

const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig.js')

const knexConection = knex(knexDatabaseConfig.development)


const insertSexo = async function (dados) {
    try {
        let sql = `insert into tbl_sexo (
            sexo
        )values (
            '${dados.sexo}'
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


const selectALLSexo = async function () {
    try {

        let sql = 'select * from tbl_sexo order by id desc;'

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


const selectByIdSexo = async function(id){
    try {
        let sql = `select * from tbl_sexo where id=${id};`

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

const updateSexo = async function(dados){
    try {
        let sql = `update tbl_sexo set
        sexo                = '${dados.sexo}'
        where id            = ${dados.id};`

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


const deleteSexo = async function(id){
    try {
        let sql = `delete from tbl_sexo where id=${id}`
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
    insertSexo,
    selectALLSexo,
    selectByIdSexo,
    updateSexo,
    deleteSexo
}