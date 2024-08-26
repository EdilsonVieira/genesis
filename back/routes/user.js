const express = require('express');
const router = express.Router();
const controle = require('../middleware/controle');
const user = require('../controllers/user');

// Rotas CRUD de usuários
router.get('/select', controle.verifyToken, function (req, res) {user.select(req, res)});

router.get('/select/:id', controle.verifyToken,function (req, res) {user.selectId(req, res)});

router.post('/insert', controle.verifyToken, function (req, res) {user.insert(req, res)});

router.put('/update/:id', controle.verifyToken, function (req, res) {user.update(req, res)});

router.delete('/delete/:id', controle.verifyToken, function (req, res) {user.excluir(req, res)});

module.exports = router