$(function(){
    var form=layui.form
    var layer=layui.layer
    form.verify({
       nickname:function(value){
        if(value.length<6){
            return "呢称长度1-6"
        }
       }
    })
    getuser()
    // 初始化信息
    function getuser(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                // console.log(res);
                if(res.status !==0){
                    return layui.layer.msg('获取失败')
                }else{
                    // $('.layui-card').html()
                    // 调用form-val表达赋值 layui
                    form.val('form-ueser',res.data)
                }
            }
        })
    }
    // 重置
    $('#btn-chongz').on('click',function(e){
        e.preventDefault()
        getuser()
    })
    // 表dan提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        // console.log(1);
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
           
            success:function(res){
                // console.log(res);
                if(res.status !==0){
                    return layui.layer.msg('更新失败')
                }
                layui.layer.msg('更新成功')

                // 调用父页面
                window.parent.getuser()
            }
        })
    })
})