'use strict';

//Apps start on start port, then AJAX request to person port to save state in cashe
//Send list of ports to page 
//After autorization give person port or send in headers
//2, 3 ports to one connection

const http = require('http');
const BASE_PORT = 2000;
const router = require('./routerAsync.js');
const user = require('./data.js');

const pid = process.pid;
const id = parseInt(process.argv[2], 10);
const port = BASE_PORT + id - 1;

console.log(`Worker: ${id}, pid: ${pid}, port: ${port}`);

const server = http.createServer((req, res) => {
	res.setHeader('Process-Id', process.pid);
  router(user, req, res);
}).listen(port);

server.on('clientError', (err, socket) => {
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});