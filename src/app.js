const restify = require('restify');
const server = restify.createServer();

server.listen('3456');
console.log('Servidor rodando na porta 3456');
