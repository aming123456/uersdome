// 登录 注册
$(function(){
    console.log(111111111);
    // 去注册
    $('#link_reg').on('click', function () {
        console.log(11);
        $('#qudenglu').hide()
        $('#zhucequ').show()
    
    });
    // 去登录
    $('#link_r').on('click',function(){
        console.log(11);
        $('#qudenglu').show()
        $('#zhucequ').hide()
    })
    //  从layui获取form
    var form = layui.form
    form.verify({
        // username 是设置自定义属性 要在lay-verify填写
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
        //   if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        //     return '用户名不能有特殊字符';
        //   }
        //   if(/(^\_)|(\__)|(\_+$)/.test(value)){
        //     return '用户名首尾不能出现下划线\'_\'';
        //   }
        //   if(/^\d+\d+\d$/.test(value)){
        //     return '用户名不能全为数字';
        //   }
          //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
        //   if(value === 'xxx'){
        //     alert('用户名不能为敏感词');
        //     return true;
        //   }
        // }
        // [name=password] 获取的是name='password' 也可以获取到指定的元素表单
            
        var pwd=$('#zhucequ [name=password]').val()
        console.log(pwd);
        console.log(value);
        if(pwd !==value){   
            return "密码不一样"
        }
    }
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        // pass 自定义 要在lay-verify填写
        ,pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
      });      
    //   注册提交
    // layer弹层方法 msg()
      var layer=layui.layer
      $('#zhucequ').on('submit',function(e){
        //   console.log(11);
          e.preventDefault()
          var data ={
             username: $('#zhucequ [name=username]').val(),
             password:$('#zhucequ [name=password]').val(),
          }
          $.post('/api/reguser', data, function(res) {
                if(res.status !==0){
                    return  layer.msg(res.message)
                }else{  
                    return  layer.msg('注册成功')
                }
          })
      })
    //   登录提交
    $('#qudenglu').on('submit',function(e){
        e.preventDefault()
        var date=$(this).serialize()
        console.log(date);
        // var date={
        //     name:$('#qudenglu  [name=title]'),
        //     password:$('#qudenglu  [name=password]')
        // }
        $.post('/api/login',date,function(res){
            console.log(res);
            if(res.status !==0){
                return layer.msg('登录失败')
            }
            layer.msg('登陆成功')
            localStorage.setItem('token',res.token)
            location.href ='/login.html'
        })
    })

})
