let grapher = null;

document.addEventListener("DOMContentLoaded", function () {
  // Аналог $(document).ready(function(){
  grapher = runGrapher();
});

let attemptsMade = 0;

async function checkPoint() {
  const data = getData();
  const errorMessage = validateData(data);

  if (errorMessage) {
    alert("Error: " + errorMessage);
    return;
  }

  const resultsTable = document.getElementById("results");
  const tableBody = resultsTable.getElementsByTagName("tbody")[0];
  const newRow = tableBody.insertRow();

  const attemptNumberCell = newRow.insertCell();
  attemptNumberCell.innerHTML = attemptsMade.toString();

  const xCell = newRow.insertCell();
  xCell.innerHTML = data.x.toString();

  const yCell = newRow.insertCell();
  yCell.innerHTML = data.y.toString();

  const rCell = newRow.insertCell();
  rCell.innerHTML = data.r.toString();

  const sendDate = new Date().getTime();
  const checkResult = await getCheckPointResult();

  const resultCell = newRow.insertCell();
  resultCell.innerHTML = checkResult.toString();
  const receiveDate = new Date().getTime();

  const attemptTimeCell = newRow.insertCell();
  attemptTimeCell.innerHTML = new Date().toISOString();

  const responseTimeMs = receiveDate - sendDate;
  const processingTimeCell = newRow.insertCell();
  processingTimeCell.innerHTML = responseTimeMs + " ms";

  // alert(JSON.stringify(data));
}

function clean() {
  const resultsTable = document.getElementById("results");
  const tableBody = resultsTable.getElementsByTagName("tbody")[0];
  attemptsMade = 0;
  tableBody.innerHTML = "";
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
