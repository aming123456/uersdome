$(function(){
    var form=layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          samepwd:function(value){
            //   console.log(value);
            if(value ===$('[name=jiumm]').val()){
                return '密码不能相同'
            }
          },
          repwd:function(value){
            if(value !==$('[name=xinmm]').val()){
                return "密码不相同"
            }
          }
   })
   $('.layui-form').on('submit',function(e){
       e.preventDefault()
       $.ajax({
           type: "POST",
           url: "/my/updatepwd",
           data: $(this).serialize(),
           success: function (res) {
               if(res.status !==0){
                   return layui.layer.msg('获取失败')
               }
               layui.layer.msg('获取成功')
            //    重置表单
            $('.layui-form')[0].reset()
           }
       });
   })
})