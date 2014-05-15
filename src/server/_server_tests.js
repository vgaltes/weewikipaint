"use strict";

var server = require("./server.js");

exports.testNothing = function(test){
    test.equals(3, server.number(), "number is not equal");
    test.done();
};