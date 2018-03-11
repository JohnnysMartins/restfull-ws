import test from 'ava';
const { connection, errorHandler } = require('./setup')

const usuarios = require('../usuarios')({ connection, errorHandler });
const auth = require('../auth')({ connection, errorHandler });

const create = () => usuarios.saveOne('usuario@teste.com', '1234');

test.beforeEach(t => connection.query('TRUNCATE TABLE usuarios'));

test.after.always(t => connection.query('TRUNCATE TABLE usuarios'));

test('Login de usuario - sucesso', async (t) => {
	await create();
	const result = await auth.anthenticate('usuario@teste.com', '1234');
	t.not(result.token, null);
	t.not(result.token.length, 0);
});
