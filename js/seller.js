//获取cookie中存取的数据
// var arr = document.cookie.split("; ");//此处用分号加空格拆分
// var cookieData = {};
// for(var i = 0; i < arr.length; i++){
//     var kv = arr[i];
//     var pair = kv.split("=");
//     cookieData[pair[0]] = pair[1];
// }
// var cid = cookieData['cid'],
//     aName = cookieData['aName'];
//获取本地存储的数据
var cid = sessionStorage['cid'],
    aName = sessionStorage['aName'];
$('#address').html(aName);

//判断登录信息

$(function(){
    //异步加载商家信息
    selectSellers('GET','data/seller_select.php',{"cid":cid,"aName":aName});
})
//点击商家，保存商家id，事件委托
$('.seller').on('click','a#toDetail',function(e){
    e.preventDefault();
    var sid = $(this).attr('href');
    // document.cookie = 'sid=' + sid;
    sessionStorage['sid'] = sid;
    location.href = 'product.html';
})
function selectSellers(type,url,data){
    $.ajax({
        type:type,
        url:url,
        data: data,
        success:function(list){
            var uid = sessionStorage['uid'];
            var html="";
            if(uid){
                //遍历每个商家
                $.each(list,function(i,p){
                    html += `
                    <div class="col-xs-3">
                    <a href="${p.sid}" id="toDetail">
                        <div class="sellers">
                            <div class="media">
                                <div class="media-left text-center">
                                    <img src=${p.img} alt="">
                                    <span>${p.sTime}分钟</span>
                                </div>
                                <div class="media-body">
                                    <h5>${p.sName}</h5>
                                    <i class="iconfont icon-wuxing"></i>
                                    <p>配送费￥${p.deliverFee}</p>
                                    <div>
                                        <i class="iconfont icon-promisse"></i>
                                        <i class="iconfont icon-service-jiayipeisan_wu"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                `;
                })
            }else{
                html =`
                    <div class="col-xs-12">
                        <p class="text-center">查看更多商家，请先<a href="login.html">登录</a></p>
                    </div>
                `;
            }
            //添加商家到页面
            $(".seller").html(html);
        },
        error:function(){
            console.log(arguments);
        }
    })
}