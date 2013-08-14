var SSE = require('sse')
  , http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain', "Access-Control-Allow-Origin": '*'});
  res.end('okay');
});

server.listen(8080, '127.0.0.1', function() {
  var sse = new SSE(server);
  sse.on('connection', function(client) {
    client.send('hi there!');
    var i = 0, j = 0;
    setInterval(function() {
      client.send("tick", "Regular Message #", j);
      j++;
    }, 1000)
    function randomMessage() {
      client.send("test", "Random Message #", 200 + i);
      setTimeout(randomMessage, 500 + (Math.random() * 600));
      i++;
    }
    randomMessage();
  });
});