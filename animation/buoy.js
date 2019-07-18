let buoyImage;
let buoyImageMoving;

class Buoy {
  constructor(path) {
    this.pos = { x: path[0].x, y: path[0].y };
    this.lastPos = { x: null, y: null };

    this.dir = createVector(0, 0);

    this.path = path;
    this.time = 0;

    this.engine = false;
    this.maxTime = 0;

    buoyImage = loadImage("assets/buoy.png");
    buoyImageMoving = loadImage("assets/buoyMoving.png");
  }

  update(newTime) {
    this.time = newTime;

    const lastFrame = this.path[this.path.length - 1];
    if (this.time > lastFrame.time) {
      this.x = lastFrame.x;
      this.y = lastFrame.y;
      this.engine = false;
    } else {
      for (let index = 0; index < this.path.length - 1; index++) {
        const { x: prevX, y: prevY, time: prevT } = this.path[index];
        const { x: nextX, y: nextY, time: nextT, engine } = this.path[
          index + 1
        ];

        if (this.time >= prevT && this.time < nextT) {
          const partial = map(this.time, prevT, nextT, 0, 1);
          const x = (nextX - prevX) * partial;
          const y = (nextY - prevY) * partial;

          const deltaY = prevY - nextY;
          const deltaX = nextX - prevX;
          this.dir = Math.atan2(deltaY, deltaX)

          this.x = prevX + x;
          this.y = prevY + y;
          this.engine = engine;
        }
      }
    }
  }

  draw() {
    push();

    translate(this.x, this.y);
    rotate(PI - this.dir);
    imageMode(CENTER);

    if (this.engine) {
      image(buoyImageMoving, 0, 0);
    } else {
      image(buoyImage, 0, 0);
    }

    pop();
  }
}
