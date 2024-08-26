const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

// Rotas de autenticação
router.post('/login', function (req, res) { 
    auth.login(req, res) 
});

module.exports = router