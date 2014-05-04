task("default", ["lint"]);

desc("Lint everything");
task ("lint", [], function()
{
    var lint = require("./build/lint/lint_runner.js");
    lint.validateFile("Jakefile.js", {}, {});
});

desc("Example!");
task("example", ["dependency"], function(){
   console.log("example task");
});

task("dependency", function()
{
    console.log("dependency task");
});