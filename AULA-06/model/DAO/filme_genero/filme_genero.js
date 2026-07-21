/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do genero na tabela de relação entre Filme e Genero
 * Data: 15/05/2026
 * Autor: Enzzo
 * Versão: 1.0
 *********************************************************************************/

const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig.js')

const knexConection = knex(knexDatabaseConfig.development)

const insertFilmeGenero = async function (filmeGenero) {
    try {
        let sql = `insert into tbl_filme_genero (
            id_filme,
            id_genero
        )values (
            '${filmeGenero.id_filme}',
            '${filmeGenero.id_genero}'
        );`

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

const selectALLFilmeGenero = async function () {
    try {

        let sql = 'select * from tbl_filme_genero order by id desc;'

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

const selectByIdFilmeGenero = async function(id){
    try {
        let sql = `select * from tbl_filme_genero where id=${id};`

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

//Função para retornar os dados do genero filtrando pelo ID do filme
const selectGenerosByIdFilme = async function(idFilme){
    try {
        let sql = ` select tbl_genero.*
                    from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero

                    where tbl_filme.id=${idFilme};`

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

//Função para retornar os dados do filme filtrando pelo ID do genero
const selectFilmesByIdGenero = async function(idGenero){
    try {
        let sql = ` select tbl_filme.*
                    from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                            
                    where tbl_genero.id=${idGenero};`

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

const updateFilmeGenero = async function(filmeGenero){
    try {
        let sql = `update tbl_filme_genero set
        id_filme            = '${filmeGenero.id_filme}',
        id_genero           = '${filmeGenero.id_genero}',
        where id            = ${filmeGenero.id};`

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

//Função para excluir um Filme Genero pelo ID
const deleteFilmeGenero = async function(id){
    try {
        let sql = `delete from tbl_filme_genero where id=${id}`
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

//Função para excluir os generos relacionados com um filme
//Obs: Esta função será utilizada no PUT do Filme
const deleteGenerosByIdFilme = async function(idFilme){
    try {
        let sql = `delete from tbl_filme_genero where id_filme=${idFilme}`
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
    insertFilmeGenero,
    selectALLFilmeGenero,
    selectByIdFilmeGenero,
    updateFilmeGenero,
    deleteFilmeGenero,
    selectGenerosByIdFilme,
    selectFilmesByIdGenero,
    deleteGenerosByIdFilme
}
