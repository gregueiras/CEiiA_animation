const fs = require("fs");

function generateData(dataNumber) {
  const data = [];
  let lastDir = 1;
  data.push([1565017570060, 85]);
  for (let i = 0; i < 1000; i++) {
    const [oldTime, oldVal] = data[i];
    let inc = (lastDir * Math.random()) / 5;
    if (Math.random() > 0.8) {
      lastDir *= -1;
    }
    let newVal = oldVal + inc;
    if (newVal > 100) {
      newVal = 100;
    } else if (newVal < 0) {
      newVal = 0;
    }
    newVal = parseFloat(newVal.toFixed(2));
    const newTime = oldTime + 100 * i;
    data.push([newTime, newVal]);
  }
  fs.writeFile(
    `data${dataNumber}.js`,
    `const data${dataNumber} = ${JSON.stringify(data)}`,
    "utf8",
    console.log
  );
}

generateData(0);
generateData(1);
