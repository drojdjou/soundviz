<!DOCTYPE html>
<html>
<head>
<title>WebGL Audio Viz</title>

<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<link rel="stylesheet" href="style.css">

</head>
<body>

<canvas id="gl-canvas"></canvas>
<canvas id="viz-canvas"></canvas>

<div class="menu">
    <div class="close">- hide options</div>
    <p>Effects</p>
    <ul class="effects">
        <li data-index="0">Liquid gem</li>
        <li data-index="1">Cityscape</li>
        <li data-index="2">Spherical lines</li>
        <li data-index="3">Waves</li>
        <li data-index="4">Elastic cube</li>
    </ul>
    <p>Source</p>
    <ul>
        <li class="mic">Microphone</li>
        <li class="track">Track</li>
    </ul>
    <p class="small">tip: Scroll for more info</p>
</div>

<div class="menu-button"><span>+</span> show options</div>

<!-- !DEV -->
<script type="text/javascript" src="squareroot-min-76.js"></script>
<!-- <script type="text/javascript" src="../../javascript/squareroot/build/sqr.js"></script> -->
<?php

	$cmdl = strlen(getcwd()) + 1;

	function getDirContents($dir) {
        
        global $cmdl;
        
		$files = scandir($dir);
        
		foreach($files as $key => $value){
            $path = realpath($dir.DIRECTORY_SEPARATOR.$value);
			if(!is_dir($path) && !preg_match("/main\.js/", $path)) {
                $js = substr($path, $cmdl);
				echo "<script type=\"text/javascript\" src=\"" . $js . "\"></script>\n";
			} else if(is_dir($path) && $value != "." && $value != "..") {
                getDirContents($path);
			}
		}
	}
    
	getDirContents('js');
    
?>
<script type="text/javascript" src="js/main.js"></script>
<!-- !DEV -->

<script>
    if(location.host.indexOf('localhost') > -1 || location.host.indexOf('192.168') > -1) {
        document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
    }
</script>

</body>
</head>




















