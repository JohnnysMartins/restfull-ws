
const usuario = function (deps) {
	this.findAll = function () {
		return new Promise((resolve, reject) => {
			const { connection, errorHandler } = deps;
			connection.query('select * from usuarios;', (error, results) => {
				if (error) {
					errorHandler(error, 'Erro ao listar usuarios', reject)
					return false;
				}
				resolve({ usuarios: results });
			});
		});
	}

	this.saveOne = function (email) {
		return new Promise((resolve, reject) => {
			const { connection, errorHandler } = deps;
			connection.query('insert into usuarios (email) values (?)', [email], (error, results) => {
				if (error) {
					console.log(error);
					errorHandler(error, `Falha ao salvar o usuario ${email}`, reject)
					return false;
				}
				resolve({ email, id: results.insertId });
			});
		});
	}

	this.updateOne = function (id, name) {
		return new Promise((resolve, reject) => {
			const { connection, errorHandler } = deps;
			connection.query('update usuarios set name = ? where id = ?', [name, id], (error, results) => {
				if (error || !results.affectedRows) {
					errorHandler(error, `Falha ao atulizar a usuario ${name}`, reject)
					return false;
				}
				let number = results.affectedRows;
				resolve({ number, name, msg: 'usuario atualizada com sucesso!' });
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
