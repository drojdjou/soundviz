var fs = require('fs');

var buildHTML = function(devFilePath, releaseFilePath, serverPath, options) {

	var devFile = fs.readFileSync(devFilePath, { encoding: 'UTF-8' }).split('\n');
	var devOut = [];

	var mDev = '!DEV';
	var mProd = '!PROD';
	var mPath = '%%PATH%%';
	var mHost = '%%HOST%%';
	var mBuild = '%%BUILD_NUMBER%%';
	var sBuild = '%%SW_BUILD%%';
	var mCDN = '%%CDN%%';
	var devLock = false;
	var prodLock = false;

	options = options || {};

	var keepDev		= options.keepDev 	|| false;
	var debug		= options.debug 	|| false;
	var host		= options.host 		|| "kuula.co";
	var cdnPath		= options.cdnPath 	|| "https://static.kuula.io/prod";
	var build 		= options.build 	|| "U0";
	var swbuild 	= options.swbuild 	|| "L0";
	var useBasePath	= options.useBasePath;

	// console.log("[k] htmlc options: " + keepDev + " / " + debug + " / " + host + " / " + cdnPath + " / " + build + " / " + useBasePath);

	devFile.forEach(function(line) {

		if(!keepDev) {
			if(line.indexOf(mDev) > -1) {
				devLock = !devLock;
				return;
			}

			if(line.indexOf(mProd) > -1) {
				prodLock = !prodLock;
				return;
			}
		}

		if(line.indexOf(mPath) > -1) 	line = line.replace(mPath, serverPath);
		if(line.indexOf(mHost) > -1) 	line = line.replace(mHost, host);
		if(line.indexOf(mCDN) > -1) 	line = line.replace(mCDN, cdnPath);
		if(line.indexOf(mBuild) > -1) 	line = line.replace(mBuild, build);
		if(line.indexOf(sBuild) > -1) 	line = line.replace(sBuild, swbuild);

		if(line.indexOf('<base') > -1 && !useBasePath) {
			return;
		}

		if(!devLock && (line.indexOf(mDev) == -1 || keepDev)) {
			if(prodLock) {

				var lt = line.trim();
				var m;

				if(m = lt.match(/^#?\s*\[([d|p])\]\s*/)) {
					if((debug && m[1] == "d") || (!debug && m[1] == "p")) {
						devOut.push(line.replace(/^#?\s*\[([d|p])\]\s*/, ''));
					} else {
						return;
					}
				} else if(lt.indexOf('//') == 0) {
					devOut.push(lt.substring(2));
				} else if(lt.indexOf('#') == 0) {
					devOut.push(lt.substring(1));
				} else {
					devOut.push(line);
				}

			} else {
				devOut.push(line);
			}

			
		}
	});

	fs.writeFileSync(releaseFilePath, devOut.join('\n'), { encoding: 'UTF-8' });
	console.log('[k]    html ' + devFilePath); // + " > " + releaseFilePath);

}

module.exports =  {
    buildHTML: buildHTML
};