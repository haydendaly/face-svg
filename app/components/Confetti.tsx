import React from "react";
import P5Wrapper from "./P5Wrapper";

const Confetti = (props) => {
  const sketch = (p5) => {
    let confettiArray = [];

    p5.setup = () => {
      p5.createCanvas(400, 400);
      p5.background(255);
    };

    p5.draw = () => {
      let xRight = p5.random(p5.width / 2, p5.width); // right corner x position
      let xLeft = p5.random(0, p5.width / 2); // bottom y position
      let confettiPieceRight = new Confetti(xRight, 0);
      let confettiPieceLeft = new Confetti(xLeft, 0);
      confettiArray.push(confettiPieceRight, confettiPieceLeft);

      p5.background(255); // redraw white background to prevent trails
      for (let i = 0; i < p5.min(confettiArray.length, 300); i++) {
        confettiArray[i].display();
        confettiArray[i].fall();
      }
    };

    class Confetti {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.col = p5.color(
          p5.random(255),
          p5.random(255),
          p5.random(255),
          p5.random(200, 255)
        );
        this.vx = p5.random(-2, 2); // add horizontal velocity
        this.vy = p5.random(2, 5); // add upward velocity
      }

      display() {
        p5.fill(this.col);
        p5.noStroke();
        p5.push();
        p5.translate(this.x, this.y);
        p5.ellipse(this.r, this.r, this.r, this.r);
        p5.pop();
      }

      fall() {
        this.y += this.vy; // add vertical velocity to y position
        this.x += this.vx; // add horizontal velocity to x position
        this.vy += 0.1; // add gravity to vertical velocity
      }
    }
  };

  return <P5Wrapper sketch={sketch} />;
};

export default Confetti;
