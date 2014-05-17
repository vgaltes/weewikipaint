"use strict";

var server = require("./server.js");
var http  = require("http");

exports.tearDown = function(cb){
    server.stop(function(){
        console.log("stop callback");
    });
    cb();
};

exports.testHttpServerResponseToGetRequest = function(test)
{
    server.start();

    http.get("http://localhost:8080", function(response){
        console.log("Got response");
        response.on("data", function(){});
        test.done();
    });
};

