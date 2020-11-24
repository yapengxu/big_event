$(function () {

    template.defaults.imports.dataformat = function (date) {

        let str = new Date(date);
        let nian = str.getFullYear();
        let yue = str.getMonth() + 1;
        yue = yue < 10 ? "0" + yue : yue
        let rr = str.getDate()
        rr = rr < 10 ? "0" + rr : rr

        let hh = str.getHours();
        hh = hh < 10 ? "0" + hh : hh
        let ff = str.getMinutes();
        ff = ff < 10 ? "0" + ff : ff
        let mm = str.getSeconds();
        mm = mm < 10 ? "0" + mm : mm

        return nian + '-' + yue + '-' + rr + ' ' + hh + ':' + ff + ':' + mm;
    }

    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage

    let q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }


    initTable()
    function initTable() {
        $.ajax({
            url: "/my/article/list",
            data: q,
            success: function (res) {
                console.log(res.data);
                if (res.status !== 0) return layer.msg(res.message)
                var htmlStr = template("tpl_qu", res)
                $("tbody").html(htmlStr)
                // 引用分页的方法
                renderPage(res.total)
            }
        });
    }

    // 初始化文章分类的方法
    initCate()
    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                // 调用模板引擎
                // 
                let htmStr = template("tpl_cate", res)
                $("[name=cate_id]").html(htmStr);
                form.render()
            }
        });
    }

    // 为筛选表单提供submit事件
    $("#form_choose").on("submit", function (e) {
        e.preventDefault();
        let cate_id = $("[name=cate_id]").val();
        let state = $("[name=state]").val();
        q.cate_id = cate_id;
        q.state = state;
        initTable()
    })

    // 分页
    function renderPage(total) {
        // console.log(total)
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发 jump 回调
            jump: function (obj, first) {
                // console.log(obj.curr)
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                q.pagesize = obj.limit

                if (!first) {
                    initTable()
                }
            }
        })

        $("tbody").on("click", ".btn-del", function () {
            let id = $(this).attr("data-id")
            let len = $(".btn-del").length
            // console.log(len);
            layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {

                $.ajax({
                    url: "/my/article/delete/" + id,
                    success: function (res) {
                        // console.log(res);
                        if (res.status !== 0) return layer.msg(res.message)

                        if (len === 1) {
                            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                        }
                        initTable()
                    }
                });
                layer.close(index);
            });

        })
    }



})