const express = require('express');
const router = express.Router();
const perfil = require('../controllers/perfil');
const controle = require('../middleware/controle');

router.get('/select', controle.verifyToken, function(req, res) {perfil.select(req, res)});

router.get('/select/:id', controle.verifyToken,function (req, res) {perfil.selectId(req, res)});

router.post('/insert', controle.verifyToken, function (req, res) {perfil.insert(req, res)});

router.put('/update/:id', controle.verifyToken, function (req, res) {perfil.update(req, res)});

router.delete('/delete/:id', controle.verifyToken, function (req, res) {perfil.excluir(req, res)});

module.exports = router