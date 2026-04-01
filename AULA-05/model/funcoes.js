const { listaDeEstados } = require("./arquivo");

function getListaDeEstados() {
    
    let ufs = []
    
    listaDeEstados.estados.forEach(function (itemEstado) {
        ufs.push(itemEstado.sigla)
        
        
    })
    
    let listaUfs = {'uf': ufs, 'quantidade':ufs.length}

    return listaUfs
    
}

function getDadosEstado(sigla){
    let estado = false

    listaDeEstados.estados.forEach(function(itemEstado){
        if (itemEstado.sigla.toUpperCase() === sigla.toUpperCase()){
            
            estado = {'uf': itemEstado.sigla, 'descricao' : itemEstado.nome, 'capital': itemEstado.capital, 'regiao': itemEstado.regiao }
            
        }

    })
    return estado

}

function getCapitalEstado(sigla){
    let estado = false

    listaDeEstados.estados.forEach(function(itemEstado){
        if(itemEstado.sigla.toUpperCase() === sigla.toUpperCase() ){
            estado = {'uf':itemEstado.sigla, 'descricao': itemEstado.nome , 'capital':itemEstado.capital}
        }
    })

    return estado

}

function getEstadosRegiao(regiao){
    let estados = []
    let resultado = false

    listaDeEstados.estados.forEach(function(itemEstado){
        if (itemEstado.regiao.toUpperCase() === regiao.toUpperCase()){
            estados.push({'uf' : itemEstado.sigla, 'descricao' : itemEstado.nome})
            
        }
    })

    if(estados.length>0){
        resultado = {'regiao': regiao.toUpperCase(),'estados': estados}
        return resultado
    }

    return resultado
    

}



function getCapitalPais(){
    let listaCapitais = {}
    let capitais = []
    listaDeEstados.estados.forEach(function(itemEstado){

        if(itemEstado.capital_pais != null){
            capitais.push({ capital_atual : itemEstado.capital_pais.capital,
                            uf : itemEstado.sigla,
                            descricao : itemEstado.nome,
                            capital : itemEstado.capital,
                            regiao : itemEstado.regiao,
                            capital_pais_ano_inicio : itemEstado.capital_pais.ano_inicio,
                            capital_pais_ano_final : itemEstado.capital_pais.ano_fim })
        }
    })
    listaCapitais = {capitais : capitais}
    return listaCapitais
}

function getCidades(sigla){
    
    let solicitarDados = false
    listaDeEstados.estados.forEach(function(itemEstado){
        if(itemEstado.sigla.toUpperCase() === sigla.toUpperCase()){
            
            const nomeCidades = []
            itemEstado.cidades.forEach(function(cidade){
                nomeCidades.push(cidade.nome)
            })

            solicitarDados = {uf : itemEstado.sigla, descricao : itemEstado.nome, quantidade_cidades : nomeCidades.length, cidades : nomeCidades}
            

        }        
        

    })
    return solicitarDados
    

}

module.exports = {
    getListaDeEstados,
    getDadosEstado,
    getCapitalEstado,
    getEstadosRegiao,
    getCapitalPais
}

//console.log(getListaDeEstados())

//console.log(getDadosEstado('PR'))

//console.log(getCapitalEstado('aC'))

//console.log(getEstadosRegiao('NortE'))

//console.log(getCapitalPais())

//console.log(getCidades('RJ'))

