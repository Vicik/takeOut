$('.btn').click(function(){
    var cid = $('select option:selected').val();
    var aName = $('#search').val();
    // var data = $('#sub').serialize();
    // data = decodeURIComponent(data,true);
    //     list = data.split('&');
    // for(var i = 0; i < list.length; i++){
    //     var tem = list[i].split('=')
    //     document.cookie = tem[0] + '=' + tem[1];
    // }
    // document.cookie = 'cid = ' + cid;
    // document.cookie = 'aName = ' + aName;
    sessionStorage['cid'] = cid;
    sessionStorage['aName'] = aName;
    location.href = 'seller.html';
})