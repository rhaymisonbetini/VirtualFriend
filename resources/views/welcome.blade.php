<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
		<title>Meu amigo virtual</title>
		<script type="text/javascript" src="{{asset('js/phaser.js')}}"></script>		
		<style>
		  body {
		    padding: 0px;
		    margin: 0px;
		    background-color: black;
		  }
		  </style>
	</head>

	<body>  
		<script src="{{asset('js/states/GameState.js')}}"></script>
		<script src="{{asset('js/states/PreloadStage.js')}}"></script>
		<script src="{{asset('js/states/BootState.js')}}"></script>
		<script src="{{asset('js/states/HomeState.js')}}"></script>
		<script src="{{asset('js/main.js')}}"></script>
	</body>
</html>
