/*global desc, task, jake, fail, complete */
"use strict";

task("default", ["lint", "test"]);

desc("Lint everything");
task ("lint", [], function()
{
    var lint = require("./build/lint/lint_runner.js");
    var list = new jake.FileList();
    list.include("**/*.js");
    list.exclude("node_modules");
    var options = {
        node: true
    };

    lint.validateFileList(list.toArray(), options, {});
});

desc("Test everything");
task("test", [], function(){
    var reporter = require("nodeunit").reporters.default;
    reporter.run(['src/server/_server_tests.js'], null, function(failures){
        if ( failures)
            fail('tests fails');
        
        console.log("tests done");
        complete();
    });
}, {async: false});