// IMPORT HTTP FROM 'http';
const http = require('http');
// IMPORT APP FILES
const app = require('./app');
// PORT NUMBER DEFINITION
const port = process.env.port || 3000;
// SERVER CREATION
const server = http.createServer(app);
// SERVER START
server.listen(port);