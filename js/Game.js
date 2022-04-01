class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
  }
  //BP
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
      // console.log(gameState);
    });
  }
  //BP
  updateState(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  // TA
  start() {
    form = new Form();
    form.display();

    player = new Player();
    playerCount = player.getCount();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

    fuelGroup = new Group();
    coinGroup = new Group();

    // function call
    this.addSprites(fuelGroup, 30, fuelImage, 0.02);
    this.addSprites(coinGroup, 20, coinImage, 0.15);
  }

  addSprites(spriteGroup, numSprites, SpriteImg, SpriteScale) {
    for (var i = 0; i < numSprites; i++) {
      var x, y;
      y = random(-height * 5, height - 100);
      x = random(width / 2 + 150, width / 2 - 150);
      var sprite = createSprite(x, y);
      sprite.addImage("Sprite", SpriteImg);
      sprite.scale = SpriteScale;
      spriteGroup.add(sprite);
    }
  }

  handleFuel(carsIndex) {
    cars[carsIndex - 1].overlap(fuelGroup, function (collector, collider) {
      collider.remove();
      console.log("Fuel Removed");
    });
  }
  handleCoin(coinsIndex) {
    cars[coinsIndex - 1].overlap(coinGroup, function (collector, collider) {
      collider.remove();
      console.log("Coin Removed");
    });
  }

  // BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("Restart Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 520, height / 2 - 400);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 450, height / 2 - 400);
  }

  // //SA
  play() {
    this.handleElements();
    Player.getPlayerInfo();
    this.handleResetButton();

    if (allPlayers !== "undefined") {
      // image(x,y,w,h)
      image(track, 0, -height * 5, width, height * 6);
      // for loop to get individual player index
      var index = 0;
      for (var i in allPlayers) {
        // console.log(i)
        // by using database getting x and y direction of allPlayers(i)
        var x = allPlayers[i].positionX;
        var y = height - allPlayers[i].positionY;
        // console.log(y);

        // increasing index
        index = index + 1;
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          textSize(30);
          fill("black");
          textAlign(CENTER);
          text(player.name, x, y + 80);
          console.log(player.index);
          this.handleFuel(index);
          this.handleCoin(index);
        }
      }

      // Move Car up
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
      // Move car down
      if (keyIsDown(DOWN_ARROW)) {
        player.positionY -= 10;
        player.update();
      }
      // Move car right
      if (keyIsDown(RIGHT_ARROW) && player.positionX < 1250) {
        player.positionX += 10;
        player.update();
      }
      // Move car left
      if (keyIsDown(LEFT_ARROW) && player.positionX > 550) {
        player.positionX -= 10;
        player.update();
      }
      drawSprites();
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        gameState: 0,
        playerCount: 0,
        players: {},
      });
      window.location.reload();
    });
  }
}
