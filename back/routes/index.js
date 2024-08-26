const express = require('express');
const cors = require('cors')

const app = express();

// Criar servidor http....
const http = require('http').createServer(app);

app.use(express.json());

// Definir o uso de URL codificada...
app.use(express.urlencoded({ extended: true }))

// Habilita chamadas entre sites diferentes...
app.use(cors());

// Rotas de login, logout e autocadastro
app.use('/auth', require('./auth.js'))

// Rotas de acesso aos perfis de usuários
app.use('/perfil', require('./perfil.js'))

// Rotas de acesso aos  usuários
app.use('/user', require('./user.js'))

module.exports = {
    app,
    http
}
