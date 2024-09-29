const express = require('express');
const cors = require('cors')

const app = express();

// Criar servidor http....
const http = require('http').createServer(app);

app.use(express.json({ limit: '10mb' }));

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

// Rotas de acesso às imagens
app.use('/imagem', require('./imagem.js'))

// Rotas de acesso às configurações
app.use('/config', require('./config.js'))

module.exports = {
    app,
    http
}
