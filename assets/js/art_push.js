$(function () {

    let layer = layui.layer
    let form = layui.form

    initEditor()

    initcate()
    //给文章分类增加方法
    function initcate() {
        $.ajax({
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                let strhtml = template("tpl_moban", res)
                // console.log(strhtml);
                $("[name=cate_id]").html(strhtml)
                form.render()
            }
        });
    }


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $("#choose").on("click", function () {
        $("#inp_choose").click()
    })

    $("#inp_choose").on("change", function (e) {
        let files = e.target.files
        if (files.length === 0) {
            return
        }


        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    let art_state = "已发布";
    $('#btn_cao').on('click', function () {
        art_state = "草稿"
    })

    $("#form_sub").on('submit', function (e) {
        e.preventDefault();

        let fd = new FormData($(this)[0]);
        // console.log(fd);
        fd.append('state', art_state)
        // console.log(fd);
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                publishArt(fd)
            })

    })

    function publishArt(fd) {
        $.ajax({
            type: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)

                layer.msg(res.message)

                location.href = "/home/article/art_list.html"
            }
        });
    }

})