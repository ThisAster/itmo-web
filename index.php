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
  <script src="index.js"></script>
</head>

<body>
  <table>
    <tr>
      <td colspan="2">
        <div onmouseover="onHeaderOver()" onmouseleave="onHeaderLeave()">
          <h1>Abulfatov Ruslan</h1>
          <h2 style="background-color: green;" id="groupNumber">P32312, var: 3201</h2>
        </div>
        <hr>
      </td>
    </tr>
    <tr>
      <td>
        <div id="parameters">
          <div id="xBlock">
            <!-- элемент, содержащий текст, при нажатии на который меняется фокус на другой элемент -->
            <label for="x">X:</label>
            <input title="enter a value x" class="inputX" id="x" type="text" placeholder="range from -5 to 5" maxlength="8" />
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
                  <button onclick="setR(1)">1</button>
                </td>
                <td>
                  <button onclick="setR(2)">2</button>
                </td>
                <td>
                  <button onclick="setR(3)">3</button>
                </td>
              </tr>
              <tr>
                <td>
                  <button onclick="setR(4)">4</button>
                </td>
                <td>
                  <button onclick="setR(5)">5</button>
                </td>
              </tr>
            </table>
          </div>
          <button class="checkPointButton" onclick="checkPoint()">check point</button>
        </div>
      </td>
      <td>
        <canvas id="graph" width="300" height="300">
          <span>
            <img src="./static/task_graph.png" alt="Task grpah" width="300" height="300" />
          </span>
        </canvas>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding: 1%;">
        <div id="result">
          <table id="results">
            <tr>
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
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>
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