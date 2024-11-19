//dentro de server execute npm init -y
//instale os pacotes npm install express pg cors body-parser

const express = require('express');
const { QualquerNome } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// linkando 
const qualquerNome = new QualquerNome({
    user: 'postgres',    // Substitua pelo seu usuário do PostgreSQL
    host: 'localhost',
    database: 'todo_list', // Nome do banco de dados
    password: 'postgres', // Substitua pela sua senha do PostgreSQL
    port: 5432,            // Porta padrão do PostgreSQL
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota para buscar todas as tarefas
app.get('/tasks', async (req, res) => {
    try {
        const result = await qualquerNome.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para adicionar uma nova tarefa
app.post('/tasks', async (req, res) => {
    const { title } = req.body;
    try {
        const result = await qualquerNome.query(
            'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
            [title]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


//implementar um botão de deletar, mas que ele não delete no banco de dados e sim só mostre para o usuario que "deletou"