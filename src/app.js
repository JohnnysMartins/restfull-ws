const server = require('./server/app');

server.listen('3456', function () {
	console.log('Servidor rodando na porta 3456');
});
