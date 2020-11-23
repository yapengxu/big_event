$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位不能出现空格'],
        // pwd: [/^[\S{6,12}]$/, "密码必须6到12位！"],
        somepwd: function (value) {
            if (value === $("[name=oldPwd]").val()) {
                return "两次密码不能一致！！"
            }
        },
        repwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return "两次密码不一致！"
            }
        }
    })

    $(".layui-form").submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {

                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);

                $('.layui-form')[0].reset()
            }
        });
    })

})