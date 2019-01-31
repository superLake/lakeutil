/*
 * @Author: sznews
 * @Date:   2018-12-21 09:18:20
 * @Last Modified by:   sznews
 * @Last Modified time: 2019-01-31 17:01:40
 */
var timer;
/**
 * @Author   Lake
 * @DateTime 2018-12-29
 * @param    {objdom}  获取的节点
 * @param    {str}     要输出的字符串
 * @param    {i}       从第几个字符开始
 * @return   {null}
 */
function printWord(objdom, str, i) {
    if (i < str.length) {
        objdom.innerHTML = str.slice(0, i++) + '_';
        timer = setTimeout(printWord, 200, objdom, str, i);
    } else {
        objdom.innerHTML = str;
        clearTimeout(timer);
    }
}
_ = {
    //网络请求
    request: function(param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res) {
                //请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //如果没有登录状态，需要强制登录
                else if (10 === res.status) {
                    _this.doLogin;
                }
                //请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function(err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    /*
     *通用事件绑定函数
     */
    bindEvent: function(domObj, event, selector, fn) {
        if (!fn) {
            fn = selector;
            selector = null;
        }
        domObj.addEventListener(event, function(e) {
            var target;
            if (selector) {
                target = e.target;
                if (target.matches(selector)) {
                    fn.call(target, e);
                }
            } else {
                fn(e);
            }
        });
    },

    /*
     *通用数组、对象对象遍历
     */
    forEach: function(obj, fn) {
        if (obj instanceof Array) {
            obj.forEach(function(item, index) {
                fn(item, index);
            });
        } else {
            for (key in obj) {
                fn(obj, key);
            }
        }
    },
    /*
     *获取url参数
     */
    getUrlParmName: function(name) {
        var regExp = new regExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    /**
     * 获取原始图片大小
     */
    getPicSize: function(img, callback) {
        var nWidth, nHeight;
        if (img.naturalWidth) {
            nWidth = img.naturalWidth;
            nHeight = img.naturalWidth
        } else {
            var image = new Image();
            image.src = img.src;
            image.onload = function() {
                image.callback(img.width, img.height);
            }
        }
        return [nWidth, nHeight];
    },
    /**
     * 参数验证
     */
    validate: function(value, type) {
        var value = $.trim(value);
        //非空验证
        if ('require' === type) {
            return !!value;
            console.log(!!value);
        }
        //手机号验证
        if ('phone' === type) {
            return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value);
        }
        //邮箱验证
        if ('email' === type) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        }
        //统一社会信用代码验证
        if ('cuscc' === type) {
            return /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/.test(value);
        }
        //身份证验证
        if ('idnum' === type) {
            return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(value);
        }
    },
    /**
     * 日期格式化
     */
    dateFormate: function(fmt, date) { //author: meizz   
        var obj = {
            "M+": date.getMonth() + 1, //月份   
            "d+": date.getDate(), //日   
            "h+": date.getHours(), //小时   
            "m+": date.getMinutes(), //分   
            "s+": date.getSeconds(), //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt)) {
            // console.log('RegExp.$1:'+fmt.replace(RegExp.$1, (date.getFullYear() + "")));
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            console.log('fmt:' + fmt);
        }
        for (var k in obj)
            if (new RegExp("(" + k + ")").test(fmt)) {
                // console.log('RegExp.$1:'+RegExp.$1);
                // fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[k]) : (("00" + obj[k]).substr(("" + obj[k]).length)))
                if (RegExp.$1.length == 1) {
                    fmt = fmt.replace(RegExp.$1, obj[k]);
                } else {
                    var temp = '00' + obj[k];
                    var len = "" + obj[k];
                    temp = temp.substr(len.length);
                    fmt = fmt.replace(RegExp.$1, temp);
                }
            }
        return fmt;
    }
}