$(function () {
    $("#login-a").on("click", function () {
        $(".reg-box").show();
        $('.login-box').hide();

    })


    $("#reg-a").on("click", function () {
        $('.login-box').show();
        $(".reg-box").hide();
    })

    let form = layui.form
    let layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val();
            if (pwd !== value) {
                return "两次密码不一致！"
            }
        }
    });
    $("#reg_form").submit(function (e) {
        e.preventDefault();
        var data = {
            username: $("#reg_form [name=username]").val(),
            password: $("#reg_form [name=password]").val()
        };

        $.post("/api/reguser", data, function (res) {
            // console.log(res);
            if (res.status !== 0) return layer.msg(res.message);

            layer.msg("注册成功！请登录", function () {
                $("#reg-a").click()
                $("#reg_form")[0].reset();
            })
        })
    })

    $("#login-form").submit(function (e) {
        e.preventDefault();
        // $("#login-form").serialize();
        // var data = {
        //     username: $("#login-form [name=username]").val(),
        //     password: $("#login-form [name=password]").val()
        // };
        // console.log(data);
        $.post("/api/login", $("#login-form").serialize(), function (res) {
            console.log(res);
            if (res.status !== 0) return layer.msg(res.message);
            localStorage.setItem("token", res.token);
            location.href = "/index.html"
        })
    })
})

