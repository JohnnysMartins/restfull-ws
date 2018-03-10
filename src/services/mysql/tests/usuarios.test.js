import test from 'ava';
const { connection, errorHandler } = require('./setup')

const usuarios = require('../usuarios')({ connection, errorHandler });

const create = () => usuarios.saveOne('usuario@teste.com', 'senha-teste');

test.beforeEach(t => connection.query('TRUNCATE TABLE usuarios'));

test.after.always(t => connection.query('TRUNCATE TABLE usuarios'));

test('Listando as usuarios', async (t) => {
	await create();
	const lista = await usuarios.findAll();
	t.is(lista.usuarios.length, 1);
	t.is(lista.usuarios[0].email, 'usuario@teste.com');
});

test('Criacao de usuario', async (t) => {
	const result = await create();
	t.is(result.email, 'usuario@teste.com');
});

test('Atualizando um usuario', async (t) => {
	await create();
	const updated = await usuarios.updateOne(1, 'nova-senha-teste');
	t.is(updated.id, 1);
	t.is(updated.number, 1);
});

test('Deletando um usuario', async (t) => {
	await create();
	const remove = await usuarios.deleteById(1);
	t.is(remove.number, 1);
});
