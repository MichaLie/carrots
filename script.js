// Global variables
let playerImg, pigImg, carotsImg, bgImg;
let player, pigs = [], carots= [];

function preload() {
  playerImg = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user379139/visual1905160/h66fc60b610aaa7eadce28b664383e491/player.png');
  pigImg = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user379139/visual1905160/h66fc60b610aaa7eadce28b664383e491/pig.png');
  carotsImg = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user379139/visual1905160/h66fc60b610aaa7eadce28b664383e491/carot.png');
  bgImg = loadImage('https://openprocessing-usercontent.s3.amazonaws.com/files/user379139/visual1905160/h66fc60b610aaa7eadce28b664383e491/background.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  
    player = new Player(playerImg);
    
    let numpigsPerRow = 10;
    let numRows = 2;
    let pigspacingX = width / numpigsPerRow;
    let pigspacingY = 50;
    
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numpigsPerRow; j++) {
        pigs.push(new pig(pigImg, j * pigspacingX + pigspacingX / 2, i * pigspacingY + 50));
      }
    }
  }

  function draw() {
    image(bgImg, 0, 0, width, height);
  
    player.show();
    player.move();
  
    for (let pig of pigs) {
      pig.show();
      pig.move();
      if (pig.hits(player)) {
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(255);
        text("You killed the bunny!!! Game over!!!", width / 2, height / 2);
        console.log("You killed the bunny!!! Game over!!!");
        noLoop();
      }
    }
  
    if (pigs.length === 0) {
      textSize(32);
      textAlign(CENTER, CENTER);
      fill(255);
      text("You won!", width / 2, height / 2);
      console.log("You won!");
      noLoop();
    }
  }
  

function keyPressed() {
    if (key === ' ') {
      carots.push(new carot(carotsImg, player.x + player.img.width / 2 - carotsImg.width / 2, height - player.img.height));
    }
  }

  class Player {
    constructor(img) {
      this.img = img;
      this.x = width / 2 - this.img.width / 4;
      this.speed = 5;
    }
  
    show() {
        image(this.img, this.x, height - this.img.height * 1.5, this.img.width * 1.5, this.img.height * 1.5);
      }
  
  
    move() {
      if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
      if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
      this.x = constrain(this.x, 0, width - this.img.width);
    }
}

class pig {
    constructor(img, x, y) {
      this.img = img;
      this.x = x;
      this.y = y;
      this.speed = 2;
      this.direction = 1;
    }
  
    show() {
        image(this.img, this.x, this.y, this.img.width / 2, this.img.height / 2);
      }
      

  move() {
    this.x += this.speed * this.direction;
    if (this.x < 0 || this.x > width - this.img.width) {
      this.direction *= -1;
      this.y += this.img.height / 2;
    }
  }
  hits(target) {
    let d = dist(
      this.x + this.img.width / 4,
      this.y + this.img.height / 4,
      target.x + target.img.width / 3,
      target.y + target.img.height / 3
    );
    return d < (this.img.width / 4 + target.img.width / 3);
  }
}

class carot {
    constructor(img, x, y) {
      this.img = img;
      this.x = x;
      this.y = y;
      this.speed = 10;
    }
  
    show() {
        image(this.img, this.x, this.y, this.img.width / 3.333, this.img.height / 3.333);
      }
  
    move() {
      this.y -= this.speed;
    }
  
    hits(target) {
        let d = dist(this.x + this.img.width / 20, this.y + this.img.height / 20, target.x + target.img.width / (target instanceof pig ? 12 : 4), target.y + target.img.height / (target instanceof pig ? 12 : 4));
        return d < (this.img.width / 20 + target.img.width / (target instanceof pig ? 12 : 4));
      }
  }
  