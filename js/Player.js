class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
  }
  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", (data) => {
      playerCount = data.val();
    });
  }
  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }
  addPlayer() {
    // this creates players heiarchy
    var playerIndex = "players/player" + this.index;
    // to give x position to both players on left and right side
    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }


    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY
    });
  }

getDistance(){
  var playerDistance = database.ref("players/player"+this.index)
  playerDistance.on("value", data=>{
    var distance = data.val()
    this.positionX = distance.positionX
    this.positionY = distance.positionY

  })
}

update(){
  var playerIndex= "players/player"+this.index
  database.ref(playerIndex).update({
    positionX: this.positionX,
    positionY: this.positionY
  });

}

  static getPlayerInfo(){
    var playerInfo = database.ref("players");
    playerInfo.on("value", data =>{
      allPlayers = data.val()
    })
  }
}
