"use strict";

var server = require("./server.js");
var http  = require("http");

exports.tearDown = function(cb){
    server.stop(function(){
    });
    cb();
};

exports.test_serverReturnHelloWorld = function(test){
    server.start();

    var request = http.get("http://localhost:8080");
    request.on("response", function(response){
        var recievedData = false;
        response.setEncoding("utf-8");
        response.on("data", function(chunk){
            recievedData = true;
            test.equals("Hello world", chunk, "response text");
        });
        response.on("end", function(){
            test.equals(200, response.statusCode, "status code");
            test.ok(recievedData, "data received");
            test.done();
        });
    });
};