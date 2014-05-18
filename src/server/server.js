"use strict";

var http  = require("http");
var server;

exports.start = function(){
    server = http.createServer();
    server.on("request", function(request, response){
        response.statusCode = 200;
        response.end("Hello world");
    });

    server.listen(8080);
};

exports.stop = function(callback){
    if (server !== undefined){
        server.close(callback);
    }
};