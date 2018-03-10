
const categoria = function (deps) {
	this.findAll = function () {
		return new Promise((resolve, reject) => {
			const { connection, errorHandler } = deps;
			connection.query('select * from categorias;', (error, results) => {
				if (error) {
					errorHandler(error, 'Erro ao listar categorias', reject)
					return false;
				}
				resolve({ categorias: results });
			});
		});
	}

	this.saveOne = function (name) {
		return new Promise((resolve, reject) => {
			const { connection, errorHandler } = deps;
			connection.query('insert into categorias (name) values (?)', [name], (error, results) => {
				if (error) {
					errorHandler(error, `Falha ao salvar a categoria ${name}`, reject)
					return false;
				}
				resolve({ name, id: results.insertId });
			});
		});
	}

	this.updateOne = function (id, name) {
		return new Promise((resolve, reject) => {
			const { connection, errorHandler } = deps;
			connection.query('update categorias set name = ? where id = ?', [name, id], (error, results) => {
				if (error || !results.affectedRows) {
					errorHandler(error, `Falha ao atulizar a categoria ${name}`, reject)
					return false;
				}
				let number = results.affectedRows;
				resolve({ number, name, msg: 'Categoria atualizada com sucesso!' });
			});
		});
	}

	this.deleteById = function (id) {
		return new Promise((resolve, reject) => {
			const { connection, errorHandler } = deps;
			connection.query('delete from categorias where id = ?', [id], (error, results) => {
				if (error || !results.affectedRows) {
					errorHandler(error, `Falha ao atulizar a categoria de ${id}`, reject)
					return false;
				}
				let number = results.affectedRows;
				resolve({ number, msg: 'Categoria excluida com sucesso!' });
			});
		});
	}
	return this;
}

module.exports = categoria;
