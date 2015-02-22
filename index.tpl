<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Dot Inversion</title>

	<!-- @if NODE_ENV = 'dev' -->
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/style.css">
	<script src="vendor/pixi.dev.js"></script>
	<script src="vendor/TweenMax.min.js"></script>
	<script src="js/app.js"></script>
	<script src="js/dot.js"></script>
	<!-- @endif -->

	<!-- @if NODE_ENV = 'prod' -->
	<link rel="stylesheet" href="dist/style.min.css">
	<script src="dist/main.min.js"></script>
	<!-- @endif -->
</head>
<body>
	<section class="control">
		<div class="control-arrow control-left" id="left"></div>
		<div class="control-arrow control-top" id="top"></div>
		<div class="control-arrow control-bottom" id="bottom"></div>
		<div class="control-arrow control-right is-enabled" id="right"></div>
	</section>
</body>
</html>