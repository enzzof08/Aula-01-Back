const knex = require('knex')

const knexDatabaseConfig = require('../../database_config/knexConfig.js')

const knexConection = knex(knexDatabaseConfig.development)

const insertAtorNacionalidade = async function (atorNacionalidade) {
    try {
        let sql = `insert into tbl_ator_nacionalidade (
            id_ator,
            id_nacionalidade
        )values (
            '${atorNacionalidade.id_ator}',
            '${atorNacionalidade.id_nacionalidade}'
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

const selectByIdAtorNacionalidade = async function(id){
    try {
        let sql = `select * from tbl_ator_nacionalidade where id=${id};`

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

const selectNacionalidadesByIdAtor = async function(idAtor){
    try {
        let sql = ` select tbl_nacionalidade.*
                    from tbl_ator
                        inner join tbl_ator_nacionalidade
                            on tbl_ator.id = tbl_ator_nacionalidade.id_ator
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade

                    where tbl_ator.id=${idAtor};`

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


const deleteAtorNacionalidade = async function(id){
    try {
        let sql = `delete from tbl_ator_nacionalidade where id=${id}`
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

const deleteNacionalidadesByIdAtor = async function(idAtor){
    try {
        let sql = `delete from tbl_ator_nacionalidade where id_ator=${idAtor}`
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
    insertAtorNacionalidade,
    selectNacionalidadesByIdAtor,
    deleteAtorNacionalidade,
    deleteNacionalidadesByIdAtor,
    selectByIdAtorNacionalidade
}