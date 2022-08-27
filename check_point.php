<?php
header('Content-Type: application/json; charset=utf-8');
$start_time = hrtime(true);

if (!(isset($_GET['x']) && isset($_GET['y']) && isset($_GET['r']))) {
    echo 'Not enough parameters';
    http_response_code(422);
} else {
    if ($x <= 5 && $x >= -5 && is_numeric($x)) {
        $x = $_GET['x'];
    } else {
        echo 'Invalid x value';
        http_response_code(422);
    }
    if ($y <= 2 && $y >= -2 && is_numeric($y)) {
        $y = $_GET['y'];
    } else {
        echo 'Invalid y value';
        http_response_code(422);
    }

    if ($r <=5 && $r >=1 && is_numeric($r)) {
        $r = $_GET['r'];
    } else {
        echo 'Invalid r value';
        http_response_code(422);
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
}
