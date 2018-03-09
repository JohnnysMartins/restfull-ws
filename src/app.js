require('dotenv').config()
const server = require('./server/app');

const port = process.env.PORT

server.listen(port, function () {
	console.log(`Servidor rodando na porta ${port}`);
});
