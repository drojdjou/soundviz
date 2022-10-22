#!/usr/bin/env node

var fs = require('fs');
var fse = require('fs-extra');

var BUILD_NUMBER = 23;

try {
    fs.rmdirSync("release", { recursive: true })
} catch (err) {
    console.error(`Error while deleting 'release'`, err);
}

fs.mkdirSync("release");

fs.mkdirSync("release/glsl");
fse.copySync("dev/glsl", "release/glsl", { overwrite: true });

fs.mkdirSync("release/assets");
fse.copySync("dev/assets", "release/assets", { overwrite: true });

fse.copySync("dev/squareroot-min-76.js", "release/squareroot-min-76.js", { overwrite: true });
fse.copySync("dev/style.css", "release/style.css", { overwrite: true });
fse.copySync("dev/template.htaccess", "release/.htaccess", { overwrite: true });

var htmlc = require('./build/htmlc');
var jcc = require('./build/jcc');

htmlc.buildHTML('dev/index.php', 'release/index.php', '/', { useBasePath: true, build: BUILD_NUMBER });
jcc.saveBucket(jcc.createBucket(
    [
        "dev/js/audio", 
        "dev/js/effects", 
        "dev/js/geometry", 
        "dev/js/objects", 
        "dev/js/ui"
    ], 
    [
        "dev/js/main.js"
    ]), 
    'soundviz-' + BUILD_NUMBER, 
    'release/'
);
