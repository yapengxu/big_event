$(function () {
    obtain()
    let layer = layui.layer
    let form = layui.form
    function obtain() {
        $.ajax({
            url: "/my/article/cates",
            data: "data",
            success: function (res) {
                // console.log(res);
                let htmlStr = template("tpl_ran", res)
                $("tbody").html(htmlStr);
            }
        });
    }
    let indexadd = null;
    $("#add_cate").on("click", function () {
        indexadd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $("#script-add").html()
        });
    })

    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg("列表添加失败！")
                layer.msg("列表添加成功！")
                obtain()
                layer.close(indexadd)
            }
        });
    })



    // 根据ID获取内容
    let indexeide = null;
    $("body").on("click", "#btn-eide", function () {
        indexeide = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $("#script-eide").html()
        });

        let id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                form.val("form-eide", res.data);
                // console.log(res);
            }
        });
    })

    $("body").on("submit", "#form-eide", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg("修改成功！")
                obtain()
                layer.close(indexeide);
            }
        });
    })


    $("body").on("click", "#btn-remove", function () {
        let id = $(this).attr("data-id");
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function (index) {

            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    obtain()
                }
            });
            layer.close(index);
        });
    })

})