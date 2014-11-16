var app = require('express')()
var http = require('http').Server(app);

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/status.html")
});

app.get('/diane.css', function(req,res) {
    res.sendFile(__dirname + "/diane.css");
});

http.listen(3000, function() {
    console.log("Listening on 3000");
});


