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

const updateAtor = async function(ator){
    try {
            let sql = `update tbl_ator set
                            nome             = '${ator.nome}',
                            data_nascimento  = '${ator.data_nascimento}',
                            biografia        = '${ator.biografia}',
                            imagem           = '${ator.imagem}',
                            id_sexo          = ${ator.id_sexo}
                        where id             = ${ator.id};`

    let result = await knexConection.raw(sql)
    
    if(result)
        return true

    else
        return false


    } catch (error) {
        return false
    }
}

const selectALLAtor = async function(){
    try {
       
        let sql = 'select * from tbl_ator order by id desc'

        //Executa no BD o script e guarda o retorno do BD, Pode ser um ERRO (false) Ou um Array com os dados
        let result = await knexConection.raw(sql)

        //Validação para verificar se o retorno do BD é um Array ou um Boolean (False)
        if(Array.isArray(result)){
            return result[0]  //Retorna somente o indice com a lista
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const selectByIdAtor = async function(id){
    try {
        let sql = `select * from tbl_ator where id=${id}`

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

const deleteAtor = async function(id){
    try {
        let sql = `delete from tbl_ator where id=${id}`

        let result = await knexConection.raw(sql)
        
        if(result)
            return true
        else
            return false

    } catch (error) {
        
        return false
    }
}

module.exports = {
    insertAtor,
    updateAtor,
    selectALLAtor,
    selectByIdAtor,
    deleteAtor
}