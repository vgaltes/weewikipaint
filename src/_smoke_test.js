// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.

// launch the server in the same way it happens in production
// get a page
// confirm we got something

(function() {
    "use strict";

    var jake = require("jake");
    var child_process = require("child_process");
    var http = require("http");
    var fs = require("fs");
    var child;
    var PORT = 5000;

    exports.setUp = function(done) {
        runServer(done);
    };

    exports.tearDown = function(done) {
        if (!child) return;

        child.on("exit", function(code, signal) {
            done();
        });
        child.kill();
    };

    exports.test_canGetHomePage = function(test) {
        httpGet("http://localhost:" + PORT, function(response, receivedData) {
            var foundHomePage = receivedData.indexOf("WeeWikiPaint home page") !== -1;
            test.ok(foundHomePage, "home page should have contained test marker");
            test.done();
        });
    };

    exports.test_canGet404Page = function(test) {
        httpGet("http://localhost:" + PORT + "/nonexistant.html", function(response, receivedData) {
            var foundHomePage = receivedData.indexOf("WeeWikiPaint 404 page") !== -1;
            test.ok(foundHomePage, "404 page should have contained test marker");
            test.done();
        });	};

    function runServer(callback) {
        var commandLine = parseProcFile();
        child = child_process.spawn(commandLine[0], commandLine.slice(1));
        child.stdout.setEncoding("utf8");
        child.stdout.on("data", function(chunk) {
            console.log("stdout: " + chunk);
            if (chunk.trim().indexOf("Server started") !== -1) callback();
        });
        child.stderr.on("data", function(chunk) {
            console.log("stderr: " + chunk);
        });
        child.on("exit", function(code, signal) {
            console.log("child process died");
        });
    }

    function parseProcFile() {
        var procFile = fs.readFileSync("Procfile", "utf8");
        var matches = procFile.trim().match(/^web:(.*)$/);     // matches 'web: foo bar baz'

        if (matches === null) throw "Could not parse ProcFile";
        var commandLine = matches[1];

        var args = commandLine.split(" ");
        args = args.filter(function(element) {
            return (element.trim() !== "");
        });
        args = args.map(function(element) {
            if (element === "$PORT") return PORT;
            else return element;
        });
        return args;
    }

    function httpGet(url, callback) {
        var request = http.get(url);
        request.on("response", function(response) {
            var receivedData = "";
            response.setEncoding("utf8");

            response.on("data", function(chunk) {
                receivedData += chunk;
            });
            response.on("end", function() {
                callback(response, receivedData);
            });
        });
    }

}());