// 页面加载完成后加载导航和页脚
$(function() {
    $('#header').load('data/header.php',function(){
        //若用户已登录，修改header中的内容
        var uid = sessionStorage['uid'];
        if(uid){
            $("#userInfo").html(`欢迎回来:${uid}用户 <a href='#' class='navbar-link'>退出登录</a>`);
        }
        $("#header").on("click","a:contains(退出登录)",function(){
            sessionStorage.removeItem('uid');
            $("#userInfo").html(`
                    <a href="register.html" class="navbar-link">注册</a>
                    <a href="login.html" class="navbar-link">登录</a>
            `);
        })
    });
    $('#footer').load('data/footer.php');
})
