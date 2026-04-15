/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do Filme no banco de dados
 * Data: 15/04/2026
 * Autor: Enzzo
 * Versão: 1.0
 *********************************************************************************/

//Função para inserir um novo filme no banco de dados
const insertFilme = async function(filme){
    let sql = `insert into tbl_filme (
	nome,
    sinopse,
    capa,
    data_lancamento,
    duracao,
    valor,
    avaliacao
) values (
	'${filme.nome}',
    '${filme.sinopse}',
    '${filme.capa}',
    '${filme.data_lancamento}',
    '${filme.duracao}',
    '${filme.valor}',
    '${filme.avaliacao}'
);`
}

//Função para atualizar um filme existente no banco de dados
const updateFilme = async function(filme){
}

//Função para retornar todos os dados de filme do banco de dados
const selectALLFilme = async function(){
}

//Função para retorna um filme filtrando pelo ID
const selectByIdFilme = async function(id){
}

//Função para excluir um filme filtrando pelo ID
const deleteFilme = async function(id){
}

module.exports = {
    insertFilme,
    updateFilme,
    selectALLFilme,
    selectByIdFilme,
    deleteFilme
}