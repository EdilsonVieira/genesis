require('dotenv').config({ path: './.env' })
const imagem = require('../dao/imagem')

// Imagens do Sistema

// Inserir uma nova imagem no sistema
const inserirImagem = (req, res) => {
    // Tratar sinonímias de parâmetros
    imagem.inserirImagem(req.body)
    .then((resp) => {
        res.status(200).json(resp)
    })
    .catch(e => res.status(e.code).json({message: e.message}))
    
}

// Atualizar uma imagem no sistema
const atualizarImagem = (req, res) => {
    imagem.atualizarImagem(req.body)
    .then((resp) => {
        res.status(200).json(resp)
    })
    .catch(e => res.status(e.code).json({message: e.message}))
}

// Buscar uma imagem no sistema
const selecionarImagem = (req, res) => {
    imagem.selecionarImagem(req.body)
    .then((resp) => {
        res.status(200).json(resp)
    })
    .catch(e => res.status(e.code).json({message: e.message}))
}

module.exports = {
    atualizarImagem,
    inserirImagem,
    selecionarImagem
}


