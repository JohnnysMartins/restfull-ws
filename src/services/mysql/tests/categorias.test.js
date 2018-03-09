import test from 'ava';
require('dotenv').config()
const mysql = require('mysql');

var connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_TEST_DATABASE
});

const errorHandler = (error, msg, rejectFunction) => {
	console.error(error);
	rejectFunction({error: msg})
}

const categorias = require('../categorias')({ connection, errorHandler });

test('Criacao de categoria', async (t) => {
	let nome = 'categoria-teste';
	const result = await categorias.saveOne(nome);
	t.is(result.name, nome)
});
