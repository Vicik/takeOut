//获取本地存储的数据
var sid = sessionStorage['sid'],
    uid = sessionStorage['uid'],
    cartId = 0,
    deliverFee = 0,
    boxFee = 0;
// 页面加载完成后加载导航和页脚
$(function(){
    // 异步加载商家信息
    select('GET','data/product_seller_select.php',{"sid":sid});
    //更新购物车
    updateCart('GET','data/cart_select.php',{uid:uid,sid:sid});
    //更新产品
    product('GET','data/product_select.php',{"sid":sid});
})

/*
添加到购物车，根据购物车编号和产品编号在购物车详情表中查找是否有该产品
*/
$('#popular').on('click','a',function(e) {
    e.preventDefault();
    var pid = $(this).attr('href');
    $.ajax({
        type: 'POST',
        url: 'data/add_cart.php',
        data: {tid: cartId,pid: pid},
        success:function(){
            updateCart('GET','data/cart_select.php',{uid:uid,sid:sid});
        },
        error:function(){
            console.log(arguments);
        }
    });
})
$('.shop-cart ul').on('click','button.add',function(e){
    e.preventDefault();
    var pid = $(this).parent().parent().children('input:hidden').val();
    var count = parseInt($(this).prev().val()) + 1;
    $(this).prev().val(count);
    $.ajax({
        type: 'POST',
        url: 'data/add_cart.php',
        data: {tid: cartId,pid: pid}
    })
})
$('.closing-cost').click(function(e){
    e.preventDefault();
    location.href = 'cart.html';
});

function updateCart(type,url,data){
    $.ajax({
        type: type,
        url: url,
        data:data,
        success:function(msg){
            // console.log(msg);
            var lis = '',
                total = 0;
            switch(msg.code){
                case 1:
                    $.each(msg.list,function(i,el){
                        total += el.count * el.price;
                        cartId = el.cartId;
                        lis += `
                            <li>
                                <input type="hidden" name="" value="${el.pid}">
                                <p class="lt">${el.pname}</p>
                                <div class="lt">
                                    <button type="button" class="minus">-</button>
                                    <input value="${el.count}">
                                    <button type="button" class="add">+</button>
                                </div>
                                <span class="lt">￥${el.price * el.count}</span>
                            </li>
                        `
                    })
                    $('.shop-cart ul').html(lis);
                    $('.total sup').html(msg.list.length);
                    $('.total span b').html(deliverFee);
                    total += parseInt(deliverFee);
                    $('.total small big').html(total);
                    break;
                case 2:
                    cartId = msg.tid;
                    break;
            }

            sessionStorage['cartId'] = cartId;
        },
        error: function(){
            console.log('异步请求错误');
        }
    })
}
function select(type,url,data){
    $.ajax({
        type:type,
        url:url,
        data: data,
        success:function(list){
            deliverFee = list.deliverFee;
            boxFee = list.boxFee;
            sessionStorage['deliverFee'] = deliverFee;
            sessionStorage['boxFee'] = boxFee;
            var html="";
            html += `
                <div class="col-xs-5">
                    <img src=${list.img} alt="">
                    <div>
                        <h3>${list.sName}</h3>
                        <i class="iconfont icon-wuxing"></i><span>(${list.eval})</span>
                    </div>
                </div>
                <div class="col-xs-1 col-xs-offset-3">
                    <dl>
                        <dt>起送价</dt>
                        <dd>${list.startSend}元</dd>
                    </dl>
                </div>
                <div class="col-xs-1">
                    <dl>
                        <dt>配送费</dt>
                        <dd>${list.deliverFee}元</dd>
                    </dl>
                </div>
                <div class="col-xs-1">
                    <dl>
                        <dt>平均送达速度</dt>
                        <dd>${list.sTime}分钟</dd>
                    </dl>
                </div>
                <div class="col-xs-1">
                    <div class="collection">
                        <a href="${list.sid}">
                            <i class="iconfont icon-aixin"></i>
                            <p>收藏</p>
                        </a>
                    </div>
                </div>
            `;
            $(".sel .row").html(html);
        },
        error: function(){
            console.log('异步请求错误');
        }
    })
}
function product(type,url,data){
    $.ajax({
        type:type,
        url:url,
        data: data,
        success:function(lists){
            var html="";
            $.each(lists,function(i,el){
                html += `
                    <div class="col-xs-6">
                        <div class="product-list">
                            <div class="media">
                                <div class="media-left">
                                    <img src=${el.pimg} alt="">
                                </div>
                                <div class="media-body">
                                    <h5>${el.pname}</h5>
                                    <span><i class="iconfont icon-wuxing"></i>(${el.evalCount}) 月售${el.pcount}份</span>
                                    <p>
                                        <span>￥${el.price}</span>
                                        <a href="${el.pid}">加入购物车</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            })
            $("#popular .row").html(html);
        },
        error: function(){
            console.log('异步请求错误');
        }
    })
}
