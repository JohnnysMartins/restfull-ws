import test from 'ava';
const { connection, errorHandler } = require('./setup')

const categorias = require('../categorias')({ connection, errorHandler });

const create = () => categorias.saveOne('categoria-teste');

test.beforeEach(t => connection.query('TRUNCATE TABLE categorias'));

test.after.always(t => connection.query('TRUNCATE TABLE categorias'));

test('Listando as categorias', async (t) => {
	await create();
	const lista = await categorias.findAll();
	t.is(lista.categorias.length, 1);
});

test('Criacao de categoria', async (t) => {
	const result = await create();
	t.is(result.name, 'categoria-teste');
});

test('Atualizando uma categoria', async (t) => {
	await create();
	const updated = await categorias.updateOne(1, 'categoria-teste-updated');
	t.is(updated.name, 'categoria-teste-updated');
	t.is(updated.number, 1);
});

test('Deletando uma categoria', async (t) => {
	await create();
	const remove = await categorias.deleteById(1);
	t.is(remove.number, 1);
});
