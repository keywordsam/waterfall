(function () {
    function Page() {
        this.loading = document.querySelector('.d-loading')
        this.el = document.querySelector('d-contain ul')
        this.width = 200
        this.columnCount = 2
        this.space = 10
        this.data = []
        this.arrHeight = []
        this.path = 'http://127.0.0.1/html5/day07/waterFallV0.0.3/server/data.php'
        this.bool = true
        this.num = 0
    }
    Page.prototype.init = function () {
        var _this = this
        this.dataFunc(1, 15, function (data) {
            if (data.length == 0) {
                return
            }
            _this.loading.style.display = "none"
            // _this.render(data)
        })
        // this.scrollFunc()
    }
    Page.prototype.dataFunc = function (page2, pageSize2, callback) {
        var _this = this
        this.ajax({
            url: this.path,
            type: 'get',
            data: {
                page: page2,
                pageSize: pageSize2
            },
            beforeSend: function () {
                console.log(_this.loading)
                _this.loading.style.display = "block"
                _this.bool = false
            },
            success: function (res) {
                if(typeof res==='undefined'||res===null){
                    return
                }
                _this.loading.setAttribute('data-page',res)

            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    // 封装ajax 
    Page.prototype.ajax = function (option) {
        // 请求方式
        var type = option.type
        // 请求数据地址
        var url = option.url
        // 提交给服务端参数
        var data = option.data
        // 拼接字符
        var dataStr = ''
        // 循环
        for (var k in option) {

            dataStr += k + "=" + option[k] + "&"
        }
        // 字符串裁剪
        dataStr = dataStr && dataStr.slice(0, -1)
        // 定义变量的接收 异步对象的实例
        var xhr;
        // 检测ie版本
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState < 4) {
                if (option.beforeSend) {
                    option.beforeSend()
                }
            }
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var res = xhr.responseText
                    // console.log(JSON.parse(res))
                    res = typeof res === 'string' ? JSON.parse(res) : res
                    if (option.success) {
                        option.success(res)
                    }
                } else {
                    var err = xhr.responseText
                    if (option.error) {
                        option.error(err)
                    }
                }
            }
        }

        xhr.open(type, url + "?" + dataStr, true)
        xhr.send(null)
    }
    new Page().init()
})()