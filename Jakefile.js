/*global desc, task, jake, fail, complet */
"use strict";

task("default", ["lint"]);

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