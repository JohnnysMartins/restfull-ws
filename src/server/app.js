const restify = require('restify');
const server = restify.createServer();
const routes = require('../http/routes');
const cors = require('./cors')

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())
server.use((req, resp, next) => {
	console.log('Ta passando por aqui')
	next()
});

routes(server);

module.exports = server;
