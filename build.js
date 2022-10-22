#!/usr/bin/env node

var fs = require('fs');

var BUILD_NUMBER = 22;

try {
    fs.rmdirSync("release", { recursive: true })
} catch (err) {
    console.error(`Error while deleting 'release'`, err);
}

fs.mkdirSync("release");
fs.mkdirSync("release/js");

var htmlc = require('./build/htmlc');
var jcc = require('./build/jcc');

htmlc.buildHTML('dev/index.php', 'release/index.php', '/', { useBasePath: true, build: BUILD_NUMBER });
jcc.saveBucket(jcc.createBucket("dev/js"), 'soundviz-' + BUILD_NUMBER, 'release/');
