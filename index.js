const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controller');  // Mudança aqui: Importa o controller em vez das routes
const db = require('./db');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração da tabela no banco de dados
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    ganhos REAL,
    despesas REAL
)`);

// Configuração das rotas
app.use('/', routes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
