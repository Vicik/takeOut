<?php
/*
接收客户端提交的did和count，
执行UPDATE，修改详情条目的购买数量
 */
    header("Content-Type:application/json");
    @$tid = $_REQUEST['tid'] or die('{"code":2,"msg":"tid required"}');
    @$pid = $_REQUEST['pid'] or die('{"code":2,"msg":"pid required"}');
    require("init.php");
    $sql = "DELETE FROM cart_detail WHERE pid = $pid AND cartId = $tid";
//    $result = mysqli_query($conn,$sql);
//    if($result===false){
//        echo "SQL语句错误";
//    }else{
//        echo '{"code":1}';
//    }
?>