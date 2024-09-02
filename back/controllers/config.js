const config = require('../dao/config')

// A função de login permite obter o token necessário nas chamadas após o middleware abaixo
function buscarConfig(req, res){
    config.buscarConfig(req.body)
    .then(config => {
        res.status(200).send(config)
    })
    .catch((e)=>tratarErroRota(e,res))
}

function definirConfig(req, res){
    config.definirConfig(req.body)
    .then(config => {
        res.status(200).send(config)
    })
    .catch((e)=>tratarErroRota(e,res))
}

module.exports = {
    buscarConfig,
    definirConfig
}
