const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model');
const UserRepository = require('./repository');

const app = express();
const userRepository = new UserRepository();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/users', (req, res) => {
    userRepository.getAllUsers((users) => {
        res.json(users);
    });
});

app.post('/users', (req, res) => {
    const { nome, ganhos, despesas } = req.body;
    const newUser = new User(null, nome, ganhos, despesas);

    userRepository.addUser(newUser, (result) => {
        res.json(result);
    });
});

app.route('/user/:id')
    .get((req, res) => {
        const { id } = req.params;
        userRepository.getUserById(id, (user) => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        });
    })
    .put((req, res) => {
        const { id } = req.params;
        const { coluna, valor } = req.body;

        userRepository.updateUser(id, coluna, valor, (result) => {
            res.json(result);
        });
    });
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    
    userRepository.deleteUserById(id, (result) => {
        res.json(result);
    });
});
    

module.exports = app;
