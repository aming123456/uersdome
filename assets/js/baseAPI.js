$.ajaxPrefilter(function(options){
    //  调用 ajax post get 固定调用这个ajxprefilter这个函数
    // 凭借 ajax 请求路径
    // http://www.liulongbin.top:3007
    // http://ajax.frontend.itheima.net
    options.url='http://ajax.frontend.itheima.net'+options.url
    console.log(options.url);
    if(options.url.indexOf('/my/') !== -1) {
        options.headers={
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //  opsstions 重加属性 它是方法啊怎么 又成回调函数了complete 
    options.complete=function(res){
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 为啥清空 token
                localStorage.removeItem('token')
                location.href='/index.html'
            
        }
    }
    
})