
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.add('HomeState', HomeState);
game.state.add('PreloadStage', PreloadStage);
game.state.add('BootState', BootState);
game.state.start('GameState');