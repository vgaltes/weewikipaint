"use strict";

var http  = require("http");
var server;

exports.start = function(portNumber){
    if(!portNumber) throw "port number is required";

    server = http.createServer();
    server.on("request", function(request, response){
        response.statusCode = 200;
        response.end("Hello world");
    });

    server.listen(portNumber);
};

exports.stop = function(callback){
    if (server !== undefined){
        server.close(callback);
    }
};