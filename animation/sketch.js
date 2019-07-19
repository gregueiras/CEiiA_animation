const CACHE = "mcbuoy";
const RADIUS = 25;
let bg;
let ellipses = [];
let buoy;
let time;
let timeOffset = 0;
let interSlider;
let timeSlider;

let loadedData = [];

let launch = false;

let buttonExportVideo = document.querySelector("#btnExportVideo"),
  chunks = [];

buttonExportVideo.onclick = record;

function setup() {
  bg = createVideo("assets/map.mp4");
  bg.hide();
  const canvas = createCanvas(1014, 828);
  ellipseMode(CENTER);

  bg.loop();

  const buttonStart = createButton("Start");
  buttonStart.mousePressed(() => {
    record();
    launchBuoy();
  });

  const buttonSave = createButton("Save");
  buttonSave.mousePressed(() => savePath());

  const buttonLoad = createButton("Load");
  buttonLoad.mousePressed(() => {
    launch = false;
    ellipses = getCache();
  });

  const buttonInterpolate = createButton("Interpolate");
  buttonInterpolate.mousePressed(() => {
    interpolate();
  });

  interSlider = createSlider(1, 10, 3, 1);
  timeSlider = createSlider(1, 10, 1);

  createP("Left Click to Add Node");
  createSpan("Right Click to Add Node with Engine");
  createP("Shift Click + Left Click to Run Selected Nodes");
  createP("Shift Click + Right Click to Run Last Sequence");

  canvas.drop(loadJson);
  textAlign(CENTER);
  textSize(25);
}

function draw() {
  time = (millis() - timeOffset) / timeSlider.value();
  image(bg, 0, 0);

  if (launch) {
    buoy.update(time / 1000);
    buoy.draw();
  } else {
    ellipses.forEach(({ x, y, engine }, index) => {
      engine ? fill("#ff4542") : fill(255);
      ellipse(x, y, RADIUS);
      fill(0);
      text(index, x, y + 10);
    });
  }
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
    ellipses = ellipses.slice(0, ellipses.length - 1);
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
  } else if (event.srcElement.localName === "canvas" && !launch) {
    ellipses.push({
      x: mouseX,
      y: mouseY,
      time: time / 1000,
      engine: mouseButton === RIGHT
    });
  }

  return true;
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

function interpolate() {
  const extra = interSlider.value();
  console.log(extra);
  console.log(ellipses);
  let newEllipses = [];

  for (let index = 0; index < ellipses.length - 1; index++) {
    const { x: prevX, y: prevY, time: prevT } = ellipses[index];
    const { x: nextX, y: nextY, time: nextT, engine } = ellipses[index + 1];

    console.log(prevX);
    newEllipses.push({ x: prevX, y: prevY, time: prevT });

    for (let start = 0.25; start < 1; start += 0.5) {
      const inc = start / extra;

      for (let partial = start; partial < 1; partial += inc) {
        const incX = (nextX - prevX) * partial;
        const incY = (nextY - prevY) * partial;
        const incT = (nextT - prevT) * partial;

        const newX = prevX + incX;
        const newY = prevY + incY;
        const newT = prevT + incT;

        console.log(partial);

        const newNode = {
          x: newX,
          y: newY,
          time: newT,
          engine
        };

        newEllipses.push(newNode);
      }
    }
  }

  newEllipses.push(ellipses[ellipses.length - 1]);

  ellipses = newEllipses;
  console.log(ellipses);
}

function record() {
  console.log("RECORD");
  chunks.length = 0;
  let stream = document.querySelector("canvas").captureStream(60),
    recorder = new MediaRecorder(stream);
  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = exportVideo;
  buttonExportVideo.onclick = e => {
    recorder.stop();
    buttonExportVideo.textContent = "start recording";
    buttonExportVideo.onclick = record;
  };
  recorder.start();
  buttonExportVideo.textContent = "stop recording";
}

function exportVideo(e) {
  var blob = new Blob(chunks);
  var vid = document.createElement("video");
  vid.id = "recorded";
  vid.controls = true;
  vid.src = URL.createObjectURL(blob);
  document.body.appendChild(vid);
  vid.play();

  downloadFile(blob, 'buoy_video.mp4')
}

function downloadFile(blob, fileName) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}
