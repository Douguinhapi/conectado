// para iniciar um projeto tem que dar esses comandos dentro de server sempre
//npm init -y
//npm install express pg cors body-parser


// Importando as dependências necessárias
const express = require('express');  // Express para criar o servidor
const { Pool } = require('pg');     // Pool do PostgreSQL para gerenciar conexões
const path = require('path');       // Path para lidar com diretórios e caminhos de arquivos

// Inicializando o servidor Express
const app = express();  // Criação da instância do servidor Express

// Configuração do pool de conexões com o banco de dados PostgreSQL
const pool = new Pool({
    user: 'postgres',    // Nome do usuário para autenticação no banco de dados
    host: 'localhost',   // O banco de dados está rodando localmente
    database: 'todo_list', // Nome do banco de dados a ser acessado
    password: 'postgres', // Senha do usuário 'postgres'
    port: 5432,          // Porta padrão para o PostgreSQL
});

// Middleware para analisar dados JSON no corpo das requisições
app.use(express.json());  // Faz com que o Express consiga ler e processar JSON no corpo da requisição

// Middleware para servir arquivos estáticos da pasta 'client'
app.use(express.static(path.join(__dirname, '../client')));  // Serve arquivos estáticos (HTML, JS, CSS) da pasta 'client'

// Rota para buscar todas as tarefas (GET)
app.get('/tasks', async (req, res) => {
    try {
        // Consulta ao banco de dados para selecionar todas as tarefas
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);  // Retorna as tarefas como resposta JSON
    } catch {
        res.status(500).send('Erro no servidor');  // Em caso de erro, retorna uma mensagem de erro
    }
});

// Rota para adicionar uma nova tarefa (POST)
app.post('/tasks', async (req, res) => {
    try {
        // Insere uma nova tarefa no banco de dados e retorna a tarefa inserida
        const result = await pool.query(
            'INSERT INTO tasks (title) VALUES ($1) RETURNING *', 
            [req.body.title]  // Pega o título da tarefa enviado no corpo da requisição
        );
        res.json(result.rows[0]);  // Retorna a tarefa inserida como resposta
    } catch {
        res.status(500).send('Erro no servidor');  // Em caso de erro, retorna uma mensagem de erro
    }
});

// Inicializa o servidor Express para escutar na porta 3000
app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));  // Inicia o servidor e imprime mensagem no console