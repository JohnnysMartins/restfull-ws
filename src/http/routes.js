const db = require('../services/mysql/app');

const routes = (server) => {
	server.post('autenticacao', async (req, res, next) => {
		try {
			const { email, senha } = req.params;
			res.send(await db.auth().anthenticate(email, senha));
		} catch (error) {
			res.send(error)
		}
		next()
	});

	server.get('categoria', async (req, res, next) => {
		try {
			res.send(await db.categorias().findAll());
		} catch (error) {
			res.send(error)
		}
		next()
	});

	server.post('categoria', async (req, res, next) => {
		const { name } = req.params;
		try {
			res.send(await db.categorias().saveOne(name));
		} catch (error) {
			res.send(error)
		}
		next()
	});

	server.post('categoria/update', async (req, res, next) => {
		const { id, name } = req.params;
		try {
			res.send(await db.categorias().updateOne(id, name));
		} catch (error) {
			res.send(error)
		}
		next()
	});

	server.post('categoria/delete', async (req, res, next) => {
		const { id } = req.params;
		try {
			res.send(await db.categorias().deleteById(id));
		} catch (error) {
			res.send(error)
		}
		next()
	});
};

module.exports = routes;
