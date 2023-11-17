const db = require('./db'); // Importe a instância do banco de dados

class UserRepository {
    constructor() {
        this.createTable();
    }

    createTable() {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            nome TEXT NOT NULL,
            ganhos REAL,
            despesas REAL
        )`);
    }

    getAllUsers(callback) {
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                console.error(err.message);
            }
    
            console.log('Linhas recuperadas:', rows.length);  // Adicione esta linha
    
            callback(rows);
        });
    }

    addUser(user, callback) {
        const { nome, ganhos, despesas } = user;
    
        // Verifica se o nome foi fornecido
        if (!nome || typeof ganhos !== 'number' || typeof despesas !== 'number') {
            console.error('Dados do usuário não fornecidos corretamente:', user);
            return callback({ error: 'Dados do usuário são obrigatórios e devem ser números para ganhos e despesas' });
        }
    
        console.log('Corpo da solicitação:', user);
    
        const sql = 'INSERT INTO users (nome, ganhos, despesas) VALUES (?, ?, ?)';
    
        db.run(sql, [nome, ganhos, despesas], function(err) {
            if (err) {
                console.error(err.message);
                return callback({ error: 'Erro ao adicionar usuário' });
            }
            callback({ id: this.lastID, message: 'Usuário criado com sucesso' });
        });
    }
    
    getUserById(id, callback) {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error(err.message);
            }
            callback(row);
        });
    }

    updateUser(id, coluna, valor, callback) {
        if (!['ganhos', 'despesas'].includes(coluna)) {
            return callback({ error: 'Coluna inválida' });
        }

        const sql = `UPDATE users SET ${coluna} = ${coluna} + ? WHERE id = ?`;

        db.run(sql, [valor, id], function(err) {
            if (err) {
                console.error(err.message);
            }
            callback({ id: id, message: 'Usuário atualizado com sucesso' });
        });
    }
    deleteUserById(id, callback) {
        const sql = 'DELETE FROM users WHERE id = ?';

        db.run(sql, [id], function (err) {
            if (err) {
                console.error(err.message);
                return callback({ error: 'Erro ao excluir usuário' });
            }
            callback({ message: 'Usuário excluído com sucesso' });
        });
    }
}

module.exports = UserRepository;
