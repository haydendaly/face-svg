let confettiArray = [];

function setup() {
  createCanvas(400, 400);
  background(255); // set background to white
}

function draw() {
  let xRight = random(width / 2, width); // right corner x position
  let xLeft = random(0, width / 2); // bottom y position
  let confettiPieceRight = new Confetti(xRight, 0);
  let confettiPieceLeft = new Confetti(xLeft, 0);
  confettiArray.push(confettiPieceRight, confettiPieceLeft);

  background(255); // redraw white background to prevent trails
  for (let i = 0; i < min(confettiArray.length, 300); i++) {
    confettiArray[i].display();
    confettiArray[i].fall();
  }
}

class Confetti {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.col = color(random(255), random(255), random(255), random(200, 255));
    this.vx = random(-2, 2); // add horizontal velocity
    this.vy = random(2, 5); // add upward velocity
  }

  display() {
    fill(this.col);
    noStroke();
    push();
    translate(this.x, this.y);
    ellipse(this.r, this.r, this.r, this.r);
    pop();
  }

  fall() {
    this.y += this.vy; // add vertical velocity to y position
    this.x += this.vx; // add horizontal velocity to x position
    this.vy += 0.1; // add gravity to vertical velocity
  }
}

