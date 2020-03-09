<?php
declare(strict_types=1);

require_once __DIR__.'/../vendor/autoload.php';

$modulePath = $argv[1];

$generator = new ExtDN\Badge\Information\Generator();
$generator->generate($modulePath);
echo $generator->getJson();
