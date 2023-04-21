// Global variables
let playerImg, pigImg, carotsImg, bgImg;
let player, pigs = [], carots = [];

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
  let pigspacingY = height / 12;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numpigsPerRow; j++) {
      pigs.push(new Pig(pigImg, j * pigspacingX + pigspacingX / 2, i * pigspacingY + height / 10));
    }
  }
}

function draw() {
  image(bgImg, 0, 0, width, height);

  player.show();
  player.move();

  let gameOver = false;

  for (let pig of pigs) {
    pig.show();
    pig.move();
    if (pig.hits(player)) {
      gameOver = true;
      break;
    }
  }

  for (let carot of carots) {
    carot.show();
    carot.move();

    for (let i = pigs.length - 1; i >= 0; i--) {
      if (carot.hits(pigs[i])) {
        pigs.splice(i, 1);
        carots.splice(carots.indexOf(carot), 1);
        break;
      }
    }
  }

  if (gameOver) {
    textSize(width / 20); // Change this value to increase/decrease the font size
    textAlign(CENTER, CENTER);
    fill(255);
    text("You killed the bunny!!! Game over!!!", width / 2, height / 2);
    console.log("You killed the bunny!!! Game over!!!");
    noLoop();
  } else if (pigs.length === 0) {
    textSize(width / 20); // Change this value to increase/decrease the font size
    textAlign(CENTER, CENTER);
    fill(255);
    text("You killed them all!! Congrats!!", width / 2, height / 2);
    console.log("You killed them all!! Congrats!!");
    noLoop();
  }
}

function keyPressed() {
  if (keyCode === 32) { // 32 is the keyCode for the spacebar
    carots.push(new carot(carotsImg, player.x + player.img.width * player.scale / 2 - carotsImg.width * player.scale / 2, height - player.img.height * player.scale * 1.5));
  }
}

class Player {
  constructor(img) {
    this.img = img;
    this.x = width / 2 - this.img.width * this.scale / 4;
    this.scale = min(width / this.img.width, height / this.img.height) / 8;
    this.speed = width / 200;
  }

  show() {
    image(this.img, this.x, height - this.img.height * this.scale * 1.5, this.img.width * this.scale, this.img.height * this.scale);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
    this.x = constrain(this.x, 0, width - this.img.width * this.scale);
  }
}

class Pig {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.scale = min(width / this.img.width, height / this.img.height) / 10;
    this.speed = width / 300;
    this.direction = 1;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width * this.scale, this.img.height * this.scale);
  }

  move() {
    this.x += this.speed * this.direction;
    if (this.x < 0 || this.x > width - this.img.width * this.scale) {
      this.direction *= -1;
      this.y += this.img.height * this.scale / 2;
    }
  }

  hits(target) {
    let pigHalfWidth = this.img.width * this.scale / 2;
    let pigHalfHeight = this.img.height * this.scale / 2;
    let playerHalfWidth = target.img.width * target.scale / 2;
    let playerHalfHeight = target.img.height * target.scale / 3;

    let pigCenterX = this.x + pigHalfWidth;
    let pigCenterY = this.y + pigHalfHeight;
    let playerCenterX = target.x + playerHalfWidth;
    let playerCenterY = height - target.img.height * target.scale * 1.5 + playerHalfHeight;

    return abs(pigCenterX - playerCenterX) < (pigHalfWidth + playerHalfWidth) &&
      abs(pigCenterY - playerCenterY) < (pigHalfHeight + playerHalfHeight);
  }
}

class Carot {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.scale = min(width / this.img.width, height / this.img.height) / 15;
    this.speed = height / 60;
  }

  show() {
    image(this.img, this.x, this.y, this.img.width * this.scale, this.img.height * this.scale);
  }

  move() {
    this.y -= this.speed;
  }

  hits(target) {
    let d = dist(this.x + this.img.width * this.scale / 2, this.y + this.img.height * this.scale / 2, target.x + target.img.width * target.scale / (target instanceof pig ? 4 : 2), target.y + target.img.height * target.scale / (target instanceof pig ? 4 : 2));
    return d < (this.img.width * this.scale / 2 + target.img.width * target.scale / (target instanceof pig ? 4 :
      2));
    }
  }
  