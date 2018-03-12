const jwt = require('jsonwebtoken');

const jwtMiddleware = (deps) => {
	const { exclusions } = deps;
	return async (req, res, next) => {
		console.log(req.href())
		if (!exclusions.includes(req.href())) {
			const token = req.headers['x-access-token'];
			if (!token) {
				res.send(403, { error: 'Token não fornecido' })
				return false;
			}

			try {
				req.decoded = jwt.verify(token, process.env.JWT_SECRET);
			} catch (error) {
				res.send(403, { error: 'falha ao autenticar o token' });
				return false;
			}
		}
		next()
	}
}

module.exports = jwtMiddleware
