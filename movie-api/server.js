const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello Node!\n');
})

console.log('My first Node test server is running on Port 8080.');

const url = require('url');
let addr = 'http://localhost:8080/default.html?year=2017&month=february';
let q = url.parse(addr, true);

console.log(q.host); 
console.log(q.pathname);
console.log(q.search); 

let qdata = q.query; 
console.log(qdata.month); 

const fs = require("fs");

fs.readFile('log.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('File content: ' + data.toString());
});

http.createServer((request, response) => {
  let addr = request.url,
    q = url.parse(addr, true),
    filePath = '';

if (q.pathname.includes('documentation')) {
  filePath = (__dirname + '/documentation.html');
} else {
  filePath = 'index.html';
}

fs.readFile(filePath, (err, data) => {
  if (err) {
    throw err;
  }

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(data);
  response.end();

});

}).listen(8080);
console.log('My test server is running on Port 8080.');