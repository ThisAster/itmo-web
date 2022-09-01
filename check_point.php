<?php
header('Content-Type: application/json; charset=utf-8');
$start_time = hrtime(true);

if (!(isset($_GET['x']) && isset($_GET['y']) && isset($_GET['r']))) {
    echo 'Not enough parameters';
    http_response_code(400);
    return;
}

if (!is_numeric($_GET['x'])) {
    echo 'X is not a number';
    http_response_code(400);
    return;
}

if (!is_numeric($_GET['y'])) {
    echo 'Y is not a number';
    http_response_code(400);
    return;
}

if (!is_numeric($_GET['r'])) {
    echo 'R is not a number';
    http_response_code(400);
    return;
}

$x = floatval($_GET['x']);
$y = floatval($_GET['y']);
$r = floatval($_GET['r']);

if ($x < -5) {
    echo 'x must be greater than (or equal to) -5';
    http_response_code(400);
    return;
}

if ($x > 5) {
    echo "x must be less than (or equal to) 5";
    http_response_code(400);
    return;
}



$hit = false;

if ($x < 0) {
    if ($y >= 0) {
        // Circle with radius r/2
        $rr = sqrt($x * $x + $y * $y);
        $hit = $rr <= $r;
    } else {
        $hit = false;
    }
} else {
    if ($y >= 0) {
        $hit = $y <= $r - $x;
    } else {
        $hit = $x < $r / 2 && $y > -$r;
    }
}

session_start();

if ($hit) {
    $_SESSION['hit_message'] = 'Successful hit!';
} else {
    $_SESSION['hit_message'] = 'Miss!';
}

$attempt = array(
    'x' => $x,
    'y' => $y,
    'r' => $r,
    'hit' => $hit,
    'attempt_time' => time(),
    'process_time' => (hrtime(true) - $start_time) / 1000000
);

if (!isset($_SESSION['attempts'])) {
    $_SESSION['attempts'] = array($attempt);
} else {
    array_push($_SESSION['attempts'], $attempt);
}

echo json_encode($attempt);
