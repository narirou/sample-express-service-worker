const app = require('./application');
const http = require('http');

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
