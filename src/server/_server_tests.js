"use strict";

var PORT = 8080;
var server = require("./server.js");
var http  = require("http");

exports.test_serverReturnHelloWorld = function(test){
    server.start(PORT);
    var request = http.get("http://localhost:8080");
    request.on("response", function(response){
        var recievedData = false;
        response.setEncoding("utf-8");
        response.on("data", function(chunk){
            test.equals("Hello world", chunk, "response text");
        });
        response.on("end", function(){
            test.equals(200, response.statusCode, "status code");
            server.stop(function(){});
            test.done();
        });
    });
};

exports.test_serverRequiresPortNumber = function(test){
    test.throws(function(){
        server.start();
    });

    test.done();
};

exports.test_serverRunsCallbackWhenStopCompletes = function(test){
    server.start(PORT);
    server.stop(function(){
        test.done();
    });
};

exports.test_stopCalledTwiceInARowThrowsException = function(test){
    server.start(PORT);
    server.stop(function(){});
    test.throws(function(){
        server.stop(function(){});
    });

    test.done();
};