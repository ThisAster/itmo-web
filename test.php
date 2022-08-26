<?php
$url = 'https://itmoweblab1.herokuapp.com/'; // url, на который отправляется запрос
$post_data = [ // поля нашего запроса
    'x' => 'val_1',
    'y' => 'val_2',
    'r' => 'afafafa'
];

$headers = []; // заголовки запроса

$post_data = http_build_query($post_data);

$curl = curl_init();
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_VERBOSE, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, true); // true - означает, что отправляется POST запрос

$result = curl_exec($curl);