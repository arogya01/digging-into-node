#! /usr/bin/env node

"use strict";
var util = require('util');
var getStdin = require("get-stdin");
// args, essentially is an object, where in
// the first el is "_", which contains all the elements that minimist or our program couldn't process
// the second one is boolean params
// the third one is string...
var args = require("minimist")(process.argv.slice(2), {
  boolean: ["help", "in"],
  string: ["file"]
});
var path = require("path");
var fs = require('fs');


// using env to setup the base path
var BASE_PATH = path.resolve(
  process.env.BASE_PATH || __dirname
);

if (args.help) {
  printHelp();
}
else if (args.in) {
  // handling content flowing in from stdin
  // getStdin works on the promise mechanism..
  getStdin().then(processFile).catch(error);
}
else if (args.file) {
  fs.readFile(path.join(BASE_PATH, args.file), function onContents(err, contents) {
    if (err) error(err.toString())
    else {
      processFile(contents.toString());
    }
  });

  processFile(path.resolve(args.file));
}
else {
  error("Incorrect usage", true);
}


function processFile(contents) {
  // read the content from the file, contents is type Buffer over here
  // console.log("the type of contents is : " + typeof contents + contents);
  contents = contents.toString().toUpperCase();
  // spit it out on the terminal
  process.stdout.write(contents);
}

function printHelp() {
  console.log("ex1 usage:");
  console.log(" ex1.js --help");
  console.log("");
  console.log("--help               print this help");
  console.log("--file={FILENAME}    process the file");
  console.log("--in, -              process stdin stuff");
  console.log("");
}

function error(msg, includeHelp = false) {
  console.error(msg);
  if (includeHelp) {
    console.log("");
    printHelp();
  }
}

// some of the problems that I'm facing, looking at this program after 12 days or so..
// 1. dont remember how many of the functions are working
// 2. lets dissect that one by one quickly..
// 3. we've got three fns -> error , printHelp and processFile..
// 4. then, we're usign a node module called "minimist" to process the arguments in the nodejs utility..
//
