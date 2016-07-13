'use strict';
const url = require('url');
var fs = require('fs');

var jsName = 'script.js';
var cssName = 'style.css';
var htmlName = 'markup.html';

module.exports = (fragmentName, fragmentUrl) => (request, response) => {
    const pathname = url.parse(request.url).pathname;
    var fragmentPath = __dirname+'/fragment_'+fragmentName;
    switch (pathname) {
        case '/'+fragmentName+'.js':
            // serve fragment's JavaScript
            response.writeHead(200, {'Content-Type': 'application/javascript'});
            fs.readFile(fragmentPath+'/'+jsName, 'utf8', function(err, contents) {
                response.end(contents);
            });
            break;
        case '/'+fragmentName+'.css':
            // serve fragment's CSS
            response.writeHead(200, {'Content-Type': 'text/css'});
            fs.readFile(fragmentPath+'/'+cssName, 'utf8', function(err, contents) {
                response.end(contents);
            });
            break;
        default:
            // serve fragment's body
            response.writeHead(200, {
                'Link': `<${fragmentUrl}/${fragmentName}.css>; rel="stylesheet",
                         <${fragmentUrl}/${fragmentName}.js>; rel="fragment-script"`,
                'Content-Type': 'text/html'
            });
            fs.readFile(fragmentPath+'/'+htmlName, 'utf8', function(err, contents) {
                response.end(contents);
            });
    }
};
