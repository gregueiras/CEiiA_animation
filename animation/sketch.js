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

  createP("Left Click to Add Node");
  createSpan("Right Click to Add Node with Engine");
  createP("Shift Click + Left Click to Run Selected Nodes");
  createP("Shift Click + Right Click to Run Last Sequence");

  const buttonSave = createButton("Save");
  buttonSave.mousePressed(() => saveToJson());

  canvas.drop(loadJson);
}

function draw() {
  const newTime = millis() - timeOffset;
  console.log(newTime)
  image(bg, 0, 0);

  if (launch) {
    //buoy.update((newTime - time) / 1000);
    buoy.update(newTime / 1000);
    buoy.draw();
  } else {
    ellipses.forEach(({ x, y, engine }) => {
      engine ? fill("#ff4542") : fill(255);
      ellipse(x, y, RADIUS);
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
  console.dir(file);
  if (file.subtype === "json") {
    const data = file.data.split(",", 2)[1];;
    console.log(data);
    loadedData = JSON.parse(atob(data));
    ellipses = loadedData;
  }
}

function getCache() {
  return JSON.parse(localStorage.getItem(CACHE));
}

function mousePressed(event) {
  if (mouseButton === CENTER || (mouseButton === RIGHT && event.shiftKey)) {
    console.log("Path Loaded");
    ellipses = getCache();
    
    if (ellipses.length > 0) {
      timeOffset = millis() - ellipses[0].time * 1000;
      time = timeOffset;
    }
    
  }

  if (event.shiftKey) {
    console.log(ellipses);
    launch = true;
    buoy = new Buoy(ellipses);
    putCache();
  } else {
    ellipses.push({
      x: mouseX,
      y: mouseY,
      time: time / 1000,
      engine: mouseButton === RIGHT
    });
  }

  return false;
}
