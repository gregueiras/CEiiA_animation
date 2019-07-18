const CACHE = "mcbuoy";
const RADIUS = 25;
let bg;
let ellipses = [];
let buoy;
let time;
let timeOffset = 0;

let loadedData = [];

let launch = false;

function setup() {
  bg = createVideo("assets/map.mp4");
  bg.hide();
  const canvas = createCanvas(1014, 828);
  ellipseMode(CENTER);

  bg.loop();

  const buttonStart = createButton("Start");
  buttonStart.mousePressed(() => launchBuoy());

  const buttonSave = createButton("Save");
  buttonSave.mousePressed(() => savePath());

  const buttonLoad = createButton("Load");
  buttonLoad.mousePressed(() => { launch = false; ellipses = getCache() });

  createP("Left Click to Add Node");
  createSpan("Right Click to Add Node with Engine");
  createP("Shift Click + Left Click to Run Selected Nodes");
  createP("Shift Click + Right Click to Run Last Sequence");

  canvas.drop(loadJson);
  textAlign(CENTER);
  textSize(25);
}

function draw() {
  const newTime = millis() - timeOffset;
  image(bg, 0, 0);

  if (launch) {
    buoy.update(newTime / 1000);
    buoy.draw();
  } else {
    ellipses.forEach(({ x, y, engine }, index) => {
      engine ? fill("#ff4542") : fill(255);
      ellipse(x, y, RADIUS);
      fill(0);
      text(index, x, y + 10);
    });
  }

  time = newTime;
}

function putCache() {
  localStorage.setItem(CACHE, JSON.stringify(ellipses));
}

function saveToJson() {
  console.log("Path Saved");
  if (JSON.stringify(ellipses) !== JSON.stringify(loadedData))
    saveJSON(ellipses, "path");
}

function loadJson(file) {
  if (file.subtype === "json") {
    const data = file.data.split(",", 2)[1];
    loadedData = JSON.parse(atob(data));
    ellipses = loadedData;
  }
}

function getCache() {

  return JSON.parse(localStorage.getItem(CACHE));
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    ellipses = ellipses.slice(0, ellipses.length - 1)
  }
}

function mousePressed(event) {
  if (mouseButton === CENTER || (mouseButton === RIGHT && event.shiftKey)) {
    console.log("Path Loaded");
    ellipses = getCache();
    resetTime();
  }

  if (event.shiftKey) {
    launchBuoy();
  } else if (event.srcElement.localName !== "button") {
    ellipses.push({
      x: mouseX,
      y: mouseY,
      time: time / 1000,
      engine: mouseButton === RIGHT
    });
  }

  return false;
}

function resetTime() {
  if (ellipses.length > 0) {
    timeOffset = millis() - ellipses[0].time * 1000;
  }
}

function launchBuoy() {
  console.log(ellipses);
  if (ellipses.length === 0) {
    ellipses = getCache();
  }

  launch = true;
  buoy = new Buoy(ellipses);
  putCache();
  resetTime();
}

function savePath() {
  putCache();
  saveToJson();
}
