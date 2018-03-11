const sha1 = require('sha1');
const jwt = require('jsonwebtoken')

const auth = function (deps) {
	this.anthenticate = function (email, senha) {
		return new Promise((resolve, reject) => {
			const { connection, errorHandler } = deps;
			const queryString = 'select id, email from usuarios where email = ? and senha = ?;'
			const queryData = [email, sha1(senha)]
			connection.query(queryString, queryData, (error, results) => {
				if (error || !results.length) {
					errorHandler(error, 'Erro ao Autenticar o usuarios', reject)
					return false;
				}
				const { email, id } = results[0];
				const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

				resolve({ token });
			});
		});
	}
	return this;
}

module.exports = auth;
