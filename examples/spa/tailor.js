'use strict';
const http = require('http');
const path = require('path');
const Tailor = require('../../index');
const serveFragment = require('./fragment');
const tailor = new Tailor({
    templatesPath: path.join(__dirname, 'templates')
});
const server = http.createServer(tailor.requestHandler);
server.listen(8080);
console.log('Tailor started at port 8080');

const fragment1 = http.createServer(
    serveFragment('header', 'http://localhost:8081')
);
fragment1.listen(8081);
console.log('Fragment Header started at port 8081');

const fragment2 = http.createServer(
    serveFragment('assets', 'http://localhost:8082')
);
fragment1.listen(8082);
console.log('Fragment Assets started at port 8082');

