"use strict";

var http  = require("http");
var fs = require("fs");

var server;

    server = http.createServer();
    server.on("request", function(request, response){
        response.statusCode = 200;

        fs.readFile('./file.html', function(err, data){
            response.end(data);
        });

//        var body = "<html><head><title>Node Http server</title></head>" +
//            "<body><p>This is a spyke of http file server</p></body></html><body>"
//        response.end(body);
    });

    server.listen(8080);

console.log("server started");