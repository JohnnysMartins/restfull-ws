const mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'toor',
	database: 'restfull_ws'
});

const errorHandler = (error, msg, rejectFunction) => {
	console.error(error);
	rejectFunction({error: msg})
}

const categoriaModule = require('./categorias')({ connection, errorHandler });

module.exports = {
	categorias: () => categoriaModule
}
