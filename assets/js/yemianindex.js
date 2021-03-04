$(function(){
    getuser()
})
// 获取用户信息  全局wionw才可以调用
function getuser(){
   $.ajax({
       method:'GET',
    // url加'' 
       url:'/my/userinfo',
    //    data:{}
    // headers:{
    //     Authorization:localStorage.getItem('token') ||''
    // },
    success:function(res){
    //   console.log(res);
      if(res.status !==0){
          return layer.msg('失败')
      }
        getint(res.data)
    },
    // 成功失败都调用 complete 有json
    // complete:function(res){
    //     console.log(res);
    //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //         // 为啥清空 token
    //         localStorage.removeItem('token')
    //         location.href='/index.html'
    //     }
    // }
   })

}
//    渲染
function getint(res){
    // $('.touxiang')
    // 获取用户名
    var name=res.nickname || res.username
    $('.welcome').html('欢迎'+ name)
    if(res.user_pic !=null){
        // 头像
        $('.text-img').attr('src',res.user_pic).show()
        $('.touxiang').hide()
    }else{
        // $('.touxiang').show()
        $('.text-img').hide()
        var frist=name[0].toUpperCase()
        $('.welcome').html(frist).show()
    }
}
var layer=layui.layer
$('#btntui').on('click',function(){
    console.log(1);
    layer.confirm('确认退出', {icon: 3, title:'提示'}, function(index){
        //do something
        // 清空 登录
        localStorage.removeItem('token')
        location.href='/index.html'
        layer.close(index);
      });
})