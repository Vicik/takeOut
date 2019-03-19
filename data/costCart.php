<?php
/*根据客户端的购物车id和商家id 查找用户在该商家的购物情况*/
header("Content-Type: application/json");
@$tid = $_REQUEST['tid'] or die('{"code":3,"msg":"tid required"}');
@$sid = $_REQUEST['sid'] or die('{"code":3,"msg":"sid required"}');
require('init.php');
$sql = "SELECT pid,pname,price,count FROM product,cart_detail WHERE sellerId = $sid AND cartId=$tid AND pid=productId";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);