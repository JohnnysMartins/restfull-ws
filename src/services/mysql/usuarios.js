const sha1 = require('sha1');

const usuario = function (deps) {
	this.findAll = function () {
		return new Promise((resolve, reject) => {
			const { connection, errorHandler } = deps;
			connection.query('select id, email from usuarios;', (error, results) => {
				if (error) {
					errorHandler(error, 'Erro ao listar usuarios', reject)
					return false;
				}
				resolve({ usuarios: results });
			});
		});
	}

	this.saveOne = function (email, senha) {
		return new Promise((resolve, reject) => {
			const { connection, errorHandler } = deps;
			connection.query('insert into usuarios (email, senha) values (?, ?)', [email, sha1(senha)], (error, results) => {
				if (error) {
					console.log(error);
					errorHandler(error, `Falha ao salvar o usuario ${email}`, reject)
					return false;
				}
				resolve({ email, id: results.insertId });
			});
		});
	}

	this.updateOne = function (id, senha) {
		return new Promise((resolve, reject) => {
			const { connection, errorHandler } = deps;
			connection.query('update usuarios set senha = ? where id = ?', [sha1(senha), id], (error, results) => {
				if (error || !results.affectedRows) {
					errorHandler(error, `Falha ao atulizar a usuario de ${id}`, reject)
					return false;
				}
				let number = results.affectedRows;
				resolve({ number, id, msg: 'usuario atualizada com sucesso!' });
			});
		});
	}

	this.deleteById = function (id) {
		return new Promise((resolve, reject) => {
			const { connection, errorHandler } = deps;
			connection.query('delete from usuarios where id = ?', [id], (error, results) => {
				if (error || !results.affectedRows) {
					errorHandler(error, `Falha ao atulizar a usuario de ${id}`, reject)
					return false;
				}
				let number = results.affectedRows;
				resolve({ number, msg: 'usuario excluida com sucesso!' });
			});
		});
	}
	return this;
}

module.exports = usuario;
