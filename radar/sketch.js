const spacer = 140;
const nLines = 12;
const drag = 6;
let points = [];

let rotator = 0;

function setup() {
  createCanvas(600, 600);
  ellipseMode(CENTER);
}

function draw() {
  background("rgba(25, 25, 25, 0.15)");

  push();

  translate(width / 2, height / 2);

  fill(0, 0, 0, 0);
  stroke(42, 153, 13);
  strokeWeight(3);

  let radius;
  for (radius = spacer; radius < width; radius += spacer) {
    ellipse(0, 0, radius);
  }

  strokeWeight(1);

  const lineLength = radius - spacer * 3;
  for (let rad = 0; rad < 2 * PI; rad += (2 * PI) / nLines) {
    line(0, 0, cos(rad) * lineLength, sin(rad) * lineLength);
  }

  stroke(42, 153, 13);

  const length = lineLength * 0.999;
  for (let i = 0; i < drag; i++) {
    const dragSpace = i * 0.01;

    strokeWeight(3);
    stroke(42, 153, 13, 255 - i * 60);

    line(
      0,
      0,
      cos(rotator + dragSpace) * length,
      sin(rotator + dragSpace) * length
    );

    if (i === 0 && Math.random() < 0.01) {
      const len = map(Math.random(), 0, 1, 0, length);
      points.push(new Point(len, rotator));
    }
  }

  rotator += 0.01;

  if (points.length > 0) {
    points = points.filter(({ translucent }) => {
        return translucent > 0
      });
    points.forEach(p => p.draw());   
  }
    
  pop();
}
