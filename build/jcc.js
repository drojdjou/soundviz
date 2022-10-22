var fs = require('fs');
var UglifyJS = require("uglify-es");
var walk = require('./walk');

var minify = function(code) {
    
    var result = "";

    try {
        result = UglifyJS.minify(code);
    } catch(e) {
        console.log("==| UglifyJS error |==");
        console.log(e);
    }

    if(result.error) {
        console.log(result.error);
    }

    return result.code;
}

var concat = function(set) {

    var concatFile = "";

    for(var i = 0; i < set.length; i++) {
        var f =  set[i];
        concatFile += "/* --- --- [" + f + "] --- --- */\n\n";
        concatFile += fs.readFileSync(f);
        concatFile += "\n\n";
    }

    return concatFile;
}

var createBucket = function(folder, files) {

    files = files || [];
    
    if(folder instanceof Array) {
        folder.forEach(function(f) {
            files = files.concat(walk(f + '/'));
        });
    } else {
        files = files.concat(walk(folder + '/'));
    }

    // Make sure there are no duplicates
    files = files.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
    });

    return processJS(files);
}

var processJS = function(files) {
    var result = {};
    result.concat = concat(files);
    result.mini = minify(result.concat);
    return result;
}

var saveBucket = function(bucket, fileBase, outputUrl, options) {
    options = options || {};
    var cf = outputUrl + fileBase + '.js';
    var content = options.header ? options.header + "\n" : "";
    content += options.debug ? bucket.concat : bucket.mini;
    fs.writeFileSync(cf, content);
    var cs = fs.statSync(cf).size;
    var cks = (cs / 1024) | 0;
    console.log('[k]    js ' + cf + '\t' + cs + ' bytes\t' + cks + ' kb');
}

module.exports =  {
    saveBucket: saveBucket,
    createBucket: createBucket
};