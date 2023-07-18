#! /usr/bin/env node

"use strict";
var util = require('util');
// var getStdin = require("get-stdin");
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
var Transform = require('stream').Transform;


// using env to setup the base path
var BASE_PATH = path.resolve(
  process.env.BASE_PATH || __dirname
);

// right now, we've been pulling in files as strings, but we can also pull in files as streams
// same outcome, but much more efficient and how you ought to do it this in nodejs
// so

if (args.help) {
  printHelp();
}
else if (args.in) {
  // handling content flowing in from stdin
  // getStdin works on the promise mechanism..
  processFile(process.stdin);
}
else if (args.file) {
  let stream = fs.createReadStream(path.join(BASE_PATH, args.file));
  processFile(stream);
}
else {
  error("Incorrect usage", true);
}


function processFile(inStream) {
  // read the content from the file, contents is type Buffer over here
  // console.log("the type of contents is : " + typeof contents + contents);
  // contents = contents.toString().toUpperCase();
  // spit it out on the terminal
  // process.stdout.write(contents);
  var outStream = inStream; 

  var upperStream = new Transform({
    transform(chunk,enc, cb){
      this.push(chunk.toString().toUpperCase());
      cb();
    }
  }); 
  outStream = outStream.pipe(upperStream); 
  
  var target = process.stdout; 
  outStream.pipe(target)
}

// even using streams, we can only read and write about 64kb of data at a time, 
// which begs the question that how do we handle files that are larger than 64kb
// well, we can use the "stream" module to create a stream that can handle larger files

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
// 4. then, we're using a node module called "minimist" to process the arguments in the nodejs utility..
//
