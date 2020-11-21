$(function () {
    getusername()

    let layer = layui.layer
    $("#off").on("click", function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something

            localStorage.removeItem("token")

            location.href = "/login.html"

            layer.close(index);
        });
    })
})


function getusername() {
    // console.log(123);
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) return;
            xunran(res.data);
            // console.log(res.data);
        }
        // },
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = "/login.html"
        //     }
        // }
    });
}

function xunran(user) {
    let name = user.nickname || user.username
    $("#welcome").html("欢迎&nbsp &nbsp" + name)

    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        let fist = name[0].toUpperCase()
        $(".text-avatar").html(fist).show();
    }
}