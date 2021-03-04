$(function(){
    get_list()
    var layer = layui.layer
    var form=layui.form
    function get_list(){
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            data: "data",
            success: function (res) {
                // console.log(res);
               var tp= template('tpl-list',res) 
               $('tbody').html(tp)     
            }
        });
    
    }
    var indexadd =null;
    
    $('#btntianj').on('click',function(){
        indexadd=layer.open({
            type:1,
            area: ['500px', '300px'],
            // offset: ['100px', '100px'],
            title: '添加文章分类'
            ,content: $('#tck-list').html()
          });     
        //  getzenj_list()   
    })
    // form表单
    // function getzenj_list(){
    $('body').on('submit','#form-add',function(e){
        // console.log(1);
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
              if(res.status !==0){
                    return layui.layer.msg('添加失败')
              } 
              get_list()  
              layer.close(layer.index);
            return layui.layer.msg('添加成功')
        
            }
            
        });
    })
    //    修改
    // }
    var indexad=null
    
    $('tbody').on('click','#bianj',function(e){
        var id=$(this).attr('data-id')
        console.log(id);
        // 弹出框
        e.preventDefault()
        indexad=layer.open({
            type:1,
            area: ['500px', '300px'],
            // offset: ['100px', '100px'],
            title: '修改文章分类'
            ,content: $('#gengx-list').html()
          }); 
          $.ajax({
            type: "GET",
            url: "/my/article/cates/"+id,
            // data: $(this).serialize(),
            success: function (res) {
                form.val('form-ite',res.data)
                console.log(res);
            //   if(res.status !==0){
            //         return layui.layer.msg('修改失败')  
            //   } 
            //   get_list()  
            //   layer.close(layer.index);
            // return layui.layer.msg('修改成功')
                // getid(res.data)
              
            }
            
        });
   
    // function getid(res){
        $('body').on('submit','#form-ad',function(e){
            // console.log(1);
            e.preventDefault()
          $.ajax({
              type: "POST",
              url: "/my/article/updatecate",
              data: $(this).serialize(),
              success: function (res) {
                  console.log(res);
                  layer.close(indexad);
                  get_list()
              }
          });
        })    
    })
    // }
    $('body').on('click','#shanc',function(e){
        e.preventDefault()
        var id=$(this).attr('date-id')
            // console.log(id);
        // $(this).remove()
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/"+id,
                success: function (res) {
                    if(res.status !=0){
                        return layui.layer.msg('删除失败')
                    }
                    layui.layer.msg('删除成功')
                    layer.close(index);
                    get_list()
                }
            });
          
          });
    })
   
})