let grapher = null;
let attemptsMade = 0;

const resultEntriesCacheKey = "result_entries";
const getEntryCacheKey = function (index) {
  return `${resultEntriesCacheKey}[${index}]`;
};
const rCacheKey = "R";
const attemptsMadeCacheKey = "attemptsMade";

document.addEventListener("DOMContentLoaded", function () {
  grapher = runGrapher();
  loadDataFromLocalStorage();
});

function addEntry(entry) {
  try {
    const resultsTable = document.getElementById("results");
    const tableBody = resultsTable.getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();
    const attemptNumberCell = newRow.insertCell();
    const xCell = newRow.insertCell();
    const yCell = newRow.insertCell();
    const rCell = newRow.insertCell();
    const resultCell = newRow.insertCell();
    const attemptTimeCell = newRow.insertCell();
    const processingTimeCell = newRow.insertCell();

    attemptNumberCell.innerHTML = entry["attemptNumber"];
    xCell.innerHTML = entry.x;
    yCell.innerHTML = entry.y;
    rCell.innerHTML = entry["r"];
    resultCell.innerHTML = entry["result"];
    attemptTimeCell.innerHTML = entry["attemptTime"];
    processingTimeCell.innerHTML = entry["processingTime"];
    grapher.addPoint(Number(entry.x), Number(entry.y));
    grapher.drawGraph();
  } catch (TypeError) {
    console.log(":)");
  }
}

function loadDataFromLocalStorage() {
  const r = localStorage.getItem(rCacheKey);
  if (r) {
    setR(r);
  }

  const attemptsMadeCached = localStorage.getItem(attemptsMadeCacheKey);
  if (attemptsMadeCached) {
    attemptsMade = attemptsMadeCached;
  }

  if (attemptsMade) {
    for (var i = 0; i < attemptsMade; i++) {
      const cachedEntryString = localStorage.getItem(getEntryCacheKey(i));
      const cachedEntry = JSON.parse(cachedEntryString);
      addEntry(cachedEntry);
    }
  } 
}

async function checkPoint() {
  const data = getData();

  const errorMessage = validateData(data);

  if (errorMessage) {
    alert("Error: " + errorMessage);
    return;
  }

  const dataEntry = {};

  dataEntry.x = data.x.toString();

  dataEntry.y = data.y.toString();

  dataEntry.r = data.r.toString();

  const sendDate = new Date().getTime();
  const checkResult = await getCheckPointResult();
  dataEntry.attemptNumber = attemptsMade;
  dataEntry.result = checkResult;
  const receiveDate = new Date().getTime();

  dataEntry.attemptTime = new Date().toISOString();

  const responseTimeMs = receiveDate - sendDate;
  dataEntry.processingTime = responseTimeMs + " ms";

  addEntry(dataEntry);

  localStorage.setItem(
    getEntryCacheKey(dataEntry.attemptNumber - 1),
    JSON.stringify(dataEntry)
  );

  localStorage.setItem(attemptsMadeCacheKey, attemptsMade);
}

function clean() {
  const resultsTable = document.getElementById("results");
  const tableBody = resultsTable.getElementsByTagName("tbody")[0];
  attemptsMade = 0;
  tableBody.innerHTML = "";
  localStorage.clear();
  grapher.cleanPoints();
  grapher.drawGraph();
}

function validateData(data) {
  if (!data.x) {
    return "x not a defined.";
  }

  if (isNaN(data.x)) {
    return "x not a number.";
  }

  if (!data.y && data.y == null) {
    return "y not a defined.";
  }

  if (isNaN(data.y)) {
    return "y not a number.";
  }

  if (!data.r) {
    return "r not a defined.";
  }

  if (isNaN(data.r)) {
    return "r not a number.";
  }

  if (data.x < -5) {
    return "x must be greater than (or equal to) -5";
  }

  if (data.x > 5) {
    return "x must be less than (or equal to) 5";
  }

  return null;
}

function getX() {
  const xInput = document.getElementById("x");
  return xInput.value.trim();
}

function setX(newValue) {
  const xInput = document.getElementById("x");
  xInput.value = newValue;
}

function getData() {
  const data = {
    x: getX(),
    y: y,
    r: r,
  };
  return data;
}

function setActiveButton(parameter, element) {
  const parameterElement = document.getElementById(parameter);
  const buttons = parameterElement.getElementsByTagName("button");
  for (const button of buttons) {
    button.className = "";
  }
  if (element) {
    element.className = "active";
  }
}

let y = null;
function setY(newValue, element) {
  y = newValue;
  setActiveButton("y", element);
}

let r = null;
function setR(newValue, element) {
  r = newValue;
  setActiveButton("r", element);
  localStorage.setItem(rCacheKey, newValue);
}
function getR() {
  return r;
}

/* function onHeaderOver() {
  const groupNumberElement = document.getElementById("groupNumber");
  groupNumberElement.style.backgroundColor = "red";
  groupNumberElement.style.transform = "translateX(10px)";
}
function onHeaderLeave() {
  const groupNumberElement = document.getElementById("groupNumber");
  groupNumberElement.style.backgroundColor = "green";
} */

async function getCheckPointResult() {
  // return new Promise((resolve) =>
  //   setTimeout(() => {
  //     resolve(true);
  //   }, 200)
  // );

  try {
    attemptsMade++;
    const res = await superagent.get("/check_point.php").query({
      x: getX(),
      y: y,
      r: r,
    });
    console.log(res);
    return res.body.hit;
  } catch (err) {
    console.error(err);
    return "error";
  }
}
