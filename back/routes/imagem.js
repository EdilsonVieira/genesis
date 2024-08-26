const express = require('express');
const router = express.Router();
const imagem = require('../controllers/imagem')
const controle = require('../middleware/controle');

router.get('/select/:id', controle.verifyToken,function (req, res) {imagem.selecionarImagem(req, res)});

router.post('/insert', controle.verifyToken, function (req, res) {imagem.inserirImagem(req, res)});

router.put('/update/:id', controle.verifyToken, function (req, res) {imagem.atualizarImagem(req, res)});

router.delete('/delete/:id', controle.verifyToken, function (req, res) {perfil.excluirImagem(req, res)});

module.exports = router