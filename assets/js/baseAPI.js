$.ajaxPrefilter(function(options){
    //  调用 ajax post get 固定调用这个ajxprefilter这个函数
    // 凭借 ajax 请求路径
    options.url='http://www.liulongbin.top:3007'+options.url
    console.log(options.url);
})