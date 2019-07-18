class Point {
  constructor(length, angle) {
    this.x = cos(angle) * length;
    this.y = sin(angle) * length;

    this.translucent = 1;
    this.pulsating = 0;
  }

  draw() {
    stroke(42, 153, 13, 255 * this.translucent);
    strokeWeight(3 + 10 * abs(sin(this.pulsating)));
    point(this.x, this.y);

    this.translucent -= 0.01;
    this.pulsating += 0.05;
  }
}
