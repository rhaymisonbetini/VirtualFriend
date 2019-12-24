var PreloadStage = {

    preload: function () {

        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, '1ogo');
        this.logo.anchor.setTo(0.5);

        this.load.image('backyard', 'assets/images/backyard.png');
        this.load.image('apple', 'assets/images/apple.png');
        this.load.image('candy', 'assets/images/candy.png');
        this.load.image('rotate', 'assets/images/rotate.png');
        this.load.image('toy', 'assets/images/rubber_duck.png');
        this.load.image('arrow', 'assets/images/arrow.png');
        this.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1); // largura, algura, frames, borda e distancia entre os frames

    },

};