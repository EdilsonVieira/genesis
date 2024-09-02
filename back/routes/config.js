const express = require('express');
const router = express.Router();
const config = require('../controllers/config')

router.get('/select', function (req, res) {
    config.buscarConfig(req, res)
})

router.put('/update', function (req, res) {
    config.definirConfig(req, res)
})

module.exports = router