
const categoria = function (deps) {
	return {
		findAll: () => {
			return new Promise((resolve, reject) => {
				const { connection, errorHandler } = deps;
				console.log('Cheguei em categorias');

				connection.query('select * from categorias;', (error, results) => {
					if (error) {
						errorHandler(error, 'Erro ao listar categorias', reject)
						return false;
					}
					resolve({ categorias: results });
				});
			});
		},

		saveOne: (name) => {
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
		},

		updateOne: (id, name) => {
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
		},

		deleteById: (id) => {
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
	}
}

module.exports = categoria;
