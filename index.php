<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Лабораторная работа №1 по веб-программированию</title>
  <link rel="stylesheet" href="style.css" />
  <script src="grapher.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/superagent@8.0.0/dist/superagent.min.js"></script>
  <!-- JavaScript Bundle with Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
  <script src="index.js"></script>
</head>

<body style="background-image: url(./static/r.png); background-size: cover; background-position: fixed; height: 100vh;">
  <table>
    <tr>
      <td colspan="3">
        <header>
          <h1>
            <span>Abulfatov</span>
            Ruslan
          </h1>
          <h2>P32312, var: 3201</h2>
        </header>
      </td>
    </tr>
    <tr>
      <td>
        <div id="parameters" class="bordered">
          <form id="form" action="/check_point.php" method="get">
            <div id="xBlock">
              <!-- элемент, содержащий текст, при нажатии на который меняется фокус на другой элемент -->
              <label for="x">X:</label>
              <div>
                <input title="enter a value x" class="inputX" id="x" type="text" placeholder="range from -5 to 5" maxlength="8" />
              </div>
            </div>
            <div id="yTable">
              <label for="y">Y:</label>
              <table title="enter a value y" id="y">
                <tr>
                  <td>
                    <button onClick="setY(-2, this)">-2</button>
                  </td>
                  <td>
                    <button onClick="setY(-1.5, this)">-1.5</button>
                  </td>
                  <td>
                    <button onClick="setY(-1, this)">-1</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button onClick="setY(-0.5, this)">-0.5</button>
                  </td>
                  <td>
                    <button onClick="setY(0, this)">0</button>
                  </td>
                  <td>
                    <button onClick="setY(0.5, this)">0.5</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button onClick="setY(1, this)">1</button>
                  </td>
                  <td>
                    <button onClick="setY(1.5, this)">1.5</button>
                  </td>
                  <td>
                    <button onClick="setY(2, this)">2</button>
                  </td>
                </tr>
              </table>
            </div>
            <div id="rBlock">
              <label id="labelR" for="r">R:</label>
              <table title="enter a value r" id="r">
                <tr>
                  <td>
                    <button onClick="setR(1, this)">1</button>
                  </td>
                  <td>
                    <button onClick="setR(2, this)">2</button>
                  </td>
                  <td>
                    <button onClick="setR(3, this)">3</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button onClick="setR(4, this)">4</button>
                  </td>
                  <td>
                    <button onClick="setR(5, this)">5</button>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <button class="actionButton" onclick="checkPoint()">check point</button>
          </form>
        </div>

        <div>
          <button class="actionButton" onclick="clean()">clean</button>
        </div>

        </div>
      </td>
      <td style="width: 400px;">
        <div class="bordered canvasContainer">
          <canvas style="margin-left: 4.4%;" id="graph" width="350" height="350">
            <span>
              <img src="./static/task_graph.png" alt="Task grpah" width="350" height="350" />
            </span>
          </canvas>
        </div>
      </td>
      <td>
        <table id="results" style="width: 128%;">
          <thead>
            <th>
              Attempt #
            </th>
            <th>
              X
            </th>
            <th>
              Y
            </th>
            <th>
              R
            </th>
            <th>
              Result
            </th>
            <th style="width: 185px">
              Attempt time
            </th>
            <th>
              Processing time
            </th>
          </thead>
          <tbody>

          </tbody>
        </table>
      </td>
    </tr>
  </table>
  <img class="cat" src="./static/VeC.gif">
  <!--   <table>
    <tr>
      <td colspan="" rowspan="">
      </td>
    </tr>
    <tr>
      <td>
        
      </td>
    </tr>
  </table> -->
</body>

</html>