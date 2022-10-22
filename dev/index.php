<!DOCTYPE html>
<html>
<head>
<title>WebGL Audio Viz</title>

<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<link rel="stylesheet" href="style.css">

</head>
<body>

<div class="gl-wrapper"><canvas id="gl-canvas"></canvas></div>

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
    <p>Audio Source</p>
    <ul>
        <li class="mic">Microphone</li>
        <li class="track">Track</li>
    </ul>
    <p class="small">Track by Codex Machine</p>
</div>

<div class="menu-button"><span>+</span> show options</div>

<div class="start">
    <button>Start</button>
</div>

<!-- It does only work with an older version of SQR -->
<script type="text/javascript" src="squareroot-min-76.js"></script>

<!-- !DEV -->
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

<!-- !PROD --><!--
<script type="text/javascript" src="-min-76.js"></script>
<script src="soundviz-%%BUILD_NUMBER%%.js"></script> 
--><!-- !PROD -->

</body>
</head>




















