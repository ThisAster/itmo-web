document.addEventListener("DOMContentLoaded", function () {
  // Аналог $(document).ready(function(){
  const parameters = getData();
  runGrapher(parameters);
});

let attemptsMade = 0;

// TODO: needs to be completed
async function checkPoint() {
  const data = getData();
  const errorMessage = validateData(data);

  if (errorMessage) {
    alert("Error: " + errorMessage);
    return;
  }

  const resultsTable = document.getElementById("results");
  const newRow = resultsTable.insertRow();

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

// TODO: needs to be completed
function validateData(data) {
  if (!data.x) {
    return "x not a defined.";
  }
  if (!data.y) {
    return "y not a defined.";
  }
  if (!data.r) {
    return "r not a defined.";
  }

  if (isNaN(data.x)) {
    return "x not a number.";
  }
  if (isNaN(data.y)) {
    return "y not a number.";
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

function getData() {
  const xInput = document.getElementById("x");
  const data = {
    x: xInput.value,
    y: y,
    r: r,
  };
  return data;
}

let y = null;
function setY(newValue) {
  y = newValue;
}

let r = null;
function setR(newValue) {
  r = newValue;
}

function onHeaderOver() {
  const groupNumberElement = document.getElementById("groupNumber");
  groupNumberElement.style.backgroundColor = "red";
  groupNumberElement.style.transform = "translateX(10px)";
}

function onHeaderLeave() {
  const groupNumberElement = document.getElementById("groupNumber");
  groupNumberElement.style.backgroundColor = "green";
}

async function getCheckPointResult() {
  return new Promise((r) =>
    setTimeout(() => {
      r(true);
    }, 200)
  );

  try {
    attemptsMade++;
    const res = await superagent.get("/check_point.php").send({
      x: x,
      y: y,
      r: r,
    });
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
}
