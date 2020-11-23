$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度在1到6位，请重新输入！'
            }
        }
    })

    infousername()

    function infousername() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                // 调用 form.val() 快速为表单赋值
                form.val("formUserInfo", res.data);
            }
        });
    }

    $("#btnre").on("click", function (e) {
        e.preventDefault();
        infousername()
    })

    $(".layui-form").on("submit", function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message);
                
                window.parent.getusername()

            }
        });
    })

})