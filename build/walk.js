var fs = require('fs');

var walk = function(dir, filelist) {
    
    var files = fs.readdirSync(dir);
    var filelist = filelist || [];

    files.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist = walk(dir + file + '/', filelist);
        } else {
            if(file.indexOf('.') != 0) filelist.push(dir + file);
        }
    });

    return filelist;
};



module.exports = walk;