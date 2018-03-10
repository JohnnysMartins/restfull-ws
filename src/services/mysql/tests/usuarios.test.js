import test from 'ava';
const { connection, errorHandler } = require('./setup')

const usuarios = require('../usuarios')({ connection, errorHandler });

const create = () => usuarios.saveOne('usuario-teste');

test.beforeEach(t => connection.query('TRUNCATE TABLE usuarios'));

test.after.always(t => connection.query('TRUNCATE TABLE usuarios'));

// test('Listando as usuarios', async (t) => {
// 	await create();
// 	const lista = await usuarios.findAll();
// 	t.is(lista.usuarios.length, 1);
// });

test('Criacao de usuario', async (t) => {
	const result = await create();
	t.is(result.email, 'usuario-teste');
});

// test('Atualizando uma categoria', async (t) => {
// 	await create();
// 	const updated = await usuarios.updateOne(1, 'categoria-teste-updated');
// 	t.is(updated.name, 'categoria-teste-updated');
// 	t.is(updated.number, 1);
// });

// test('Deletando uma categoria', async (t) => {
// 	await create();
// 	const remove = await usuarios.deleteById(1);
// 	t.is(remove.number, 1);
// });
