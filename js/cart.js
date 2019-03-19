$(function(){
    var tid = sessionStorage['cartId'],
        sid = sessionStorage['sid'],
        totalAmt = 0;
    $.ajax({
        type:'GET',
        url: 'data/costCart.php',
        data: {tid:tid, sid:sid},
        success: function(data){
            var lis = '';
            $.each(data,function(i,el){
                totalAmt += el.count * el.price;
                lis += `
                    <div class="row">
                        <div class="col-xs-6">
                            <span>${el.pname}</span>
                        </div>
                        <div class="col-xs-4">
                            <button type="button">-</button>
                            <input value="${el.count}">
                            <button type="button">+</button>
                        </div>
                        <div class="col-xs-2">
                            <span>￥${el.price * el.count}</span>
                        </div>
                    </div>
                `
            })
            $('.list').html(lis);
            var deliverFee = parseFloat(sessionStorage['deliverFee']).toFixed(2),
                box = (sessionStorage['boxFee'] * parseInt(data.length)).toFixed(2);
            totalAmt += deliverFee * 1 + box * 1;
            $('.deliver').html('￥' + deliverFee);
            $('.box').html('￥' + box);
            $('.total p').html(`<small>￥</small>${totalAmt.toFixed(2)}`);
            $('.total span').html(`共${data.length}份商品`);
        },
        error: function(){
            console.log(arguments);
        }
    })
})