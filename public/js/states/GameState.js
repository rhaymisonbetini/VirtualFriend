var GameState = {

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },



    preload: function () {

        this.load.image('preloadBar', 'assets/images/bar.png');
        this.load.image('logo', 'assets/images/logo.png');

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
    

    create: function () {
      this.background = this.game.add.sprite(0, 0, 'backyard');
      this.background.inputEnabled = true;
      this.background.events.onInputDown.add(this.placeItem, this);
  
      //codigos relativo ao pet
      this.pet = this.game.add.sprite(100, 400, 'pet');
      this.pet.anchor.setTo(0.5);
      this.pet.customParams = { health: 100, fun: 100 };
      this.pet.inputEnabled = true;
      this.pet.input.enableDrag();
  
      //animação do pet
      this.pet.animations.add('funnyfaces', [1, 2, 3, 2, 1], 7, false);
  
  
  
      //codigos relativos a maça
      this.apple = this.game.add.sprite(72, 570, 'apple');
      this.apple.anchor.setTo(0.5);
      this.apple.inputEnabled = true;
      this.apple.customParams = { health: 20 };
      this.apple.events.onInputDown.add(this.pickItem, this);
  
      //codigos relativos ao doce
      this.candy = this.game.add.sprite(144, 570, 'candy');
      this.candy.anchor.setTo(0.5);
      this.candy.customParams = { health: -10, fun: 10 };
      this.candy.inputEnabled = true;
      this.candy.events.onInputDown.add(this.pickItem, this);
  
      //codigos relativos ao patinho de borracha
      this.toy = this.game.add.sprite(216, 570, 'toy');
      this.toy.anchor.setTo(0.5);
      this.toy.inputEnabled = true;
      this.toy.customParams = { fun: 10 };
      this.toy.events.onInputDown.add(this.pickItem, this);
  
      //codigos relativos  a rotaçao
      this.rotate = this.game.add.sprite(288, 570, 'rotate');
      this.rotate.anchor.setTo(0.5);
      this.rotate.inputEnabled = true;
      this.rotate.events.onInputDown.add(this.rotatePet, this);
  
  
      this.buttons = [
        this.apple,
        this.candy,
        this.toy,
        this.rotate
      ];
  
      this.selectedItem = null;
      this.uiBlocked = null; // variavel chate que controla as entradadas de ações do usuário, por padrão começa desbloqueada
  
      var style = {
        font: '20px Arial', fill: '#fff'
      };
  
      var style2 = {
        font: '25px bold Arial', fill: 'black'
      }
  
      this.game.add.text(10, 20, 'Saúde:', style);
      this.game.add.text(140, 20, 'Diversão:', style);
  
      this.healthText = this.game.add.text(80, 20, '', style2);
      this.funText = this.game.add.text(235, 20, '', style2);
  
      this.refreshStats();
  
  
      //contator de vida do bixinho
      this.statsDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this);
  
    },
  
  
    pickItem: function (sprite, event) {
      if (!this.uiBlocked) {
        this.clearSelection();
        sprite.alpha = 0.4;
        this.selectedItem = sprite;
      }
    },
  
  
  
    placeItem: function (sprite, event) {
  
      if (this.selectedItem && !this.uiBlocked) {
        let x = event.position.x;
        let y = event.position.y;
  
        var newItem = this.game.add.sprite(x, y, this.selectedItem.key);
        newItem.anchor.setTo(0.5);
        newItem.customParams = this.selectedItem.customParams;
  
        this.uiBlocked = true; // bloqueando novos cliques para nao duplicar o item na tela;
  
        petMoviment = this.game.add.tween(this.pet);
        petMoviment.to({
          x: x,
          y: y
        }, 700);
  
  
        petMoviment.onComplete.add(() => {
          newItem.destroy();
  
          this.pet.animations.play('funnyfaces');
  
          this.uiBlocked = false;
  
  
          var stat;
          for (stat in newItem.customParams) {
            if (newItem.customParams.hasOwnProperty(stat)) {
              this.pet.customParams[stat] += newItem.customParams[stat];
            }
          }
  
          this.refreshStats();
  
        }, this);
  
        petMoviment.start();
  
      }
    },
  
  
    rotatePet: function (sprite, event) {
      if (!this.uiBlocked) {
        this.uiBlocked = true;
        this.clearSelection();
        sprite.alpha = 0.4;
  
        var petRotation = this.game.add.tween(this.pet);
        petRotation.to({ angle: '+720' }, 1000);
  
  
        petRotation.onComplete.add(() => {
          this.uiBlocked = false;
          sprite.alpha = 1;
          this.pet.customParams.fun += 10;
          this.refreshStats();
        }, this);
  
  
        petRotation.start();
  
      }
    },
  
  
    refreshStats: function () {
      this.healthText.text = this.pet.customParams.health;
      this.funText.text = this.pet.customParams.fun;
    },
  
    clearSelection: function () {
      this.buttons.forEach((element, index) => {
        element.alpha = 1;
      });
      this.selectedItem = null;
    },
  
  
    reduceProperties: function () {
      this.pet.customParams.health -= 10;
      this.pet.customParams.fun -= 15;
      this.refreshStats();
    },
  
  
    update: function () {
      if (this.pet.customParams.health <= 0 || this.pet.customParams.fun <= 0) {
        this.pet.frame = 4;
        this.uiBlocked = true;
  
        this.game.time.events.add(2000, this.gameOver, this);
      }
    },
  
  
    gameOver: function () {
      this.game.state.restart();
    }
  
  }
  