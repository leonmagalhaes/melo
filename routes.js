// routes.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Adicione as rotas do controller ao roteador
router.use('/', controller);

module.exports = router;
