/*
 * @Author: sznews
 * @Date:   2018-12-21 09:18:20
 * @Last Modified by:   xiaoy
 * @Last Modified time: 2019-05-23 00:17:39
 */
var timer;
// 全局上下文this
var context=this;
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
/**
 * [throttle description]
 * @Author   Lake
 * @DateTime 2019-02-25T21:29:47+0800
 * @param    {[function]}                 method [需要时间节流的方法]
 * @param    {[time]}                     delay  [节流事件（以毫秒算）]
 * @return   {null}                     
 */
function throttle(method,delay){
	var timer=null;
	if(timer){
		clearTimeout(timer)
	}
	timer=setTimeout(function(){
		method();
	}, delay)
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
                // 请求成功
                // if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                // }
                //如果没有登录状态，需要强制登录
                // else if (10 === res.status) {
                //     _this.doLogin;
                // }
                //请求数据错误
                // else if (1 === res.status) {
                //     typeof param.error === 'function' && param.error(res.msg);
                // }
                // typeof param.success === 'function' && param.success(res);
            },
            error: function(err) {
                typeof param.error === 'function' && param.error(err);
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
    },
    /**
     * 接收后台发过来的二进制数据流
     * （用于接收后台图片验证码）
     */
    getImageSteam:function(url,imgid){
        var xhr =new XMLHttpRequest();
        xhr.open('get',url,true);
        // 设置后台返回数据类型，blod为二进制封装类型
        xhr.responseType='blob';
        xhr.onload=function(){
            if(this.status==200){
                var blob=this.response;
                var img=document.getElementById(imgid);
                // 图片加载完后消除blod，如果不消除就会导致页面性能减慢
                img.onload=function(e){
                    window.URL.revokeObjectURL(blob);
                };
                img.src=window.URL.createObjectURL(blob);
            }
        }
        xhr.send();
    },
    /**
     * [throttle description]
     * @Author   Lake
     * @DateTime 2019-02-25T21:29:47+0800
     * @param    {[function]}                 method [需要时间节流的方法]
     * @param    {[time]}                     delay  [节流事件（以毫秒算）]
     * @return   {null}                     
     */
    throttle:function(method,delay){
    	var timer=null;
    	if(timer){
    		clearTimeout(timer)
    	}
    	timer=setTimeout(function(){
    		method();
    	}, delay)
    },
    /**
     * 传入的字符串根据条件转码或解码
     * @Author   Lake
     * @DateTime 2019-05-22T22:51:31+0800
     * @param    {[string]}                 strType [输入操作类型，encode是转码，decode是解码]
     * @param    {[string]}                 str     [转码或解码的字符串]
     * @return   {[string]}                         [转码或解码后的字符串]
     */
    uriCodeHandler:function(strType,str){
    	//如果输入的参数为string类型
    	if('string'===typeof str&&strType==='encode'){
	    	return encodeURIComponent(str)
	    }else if('string'===typeof str&&strType==='decode'){
	    	return decodeURIComponent(str)
    	}else if('object'===typeof str && strType==='encode'){
    		let newobj={}
    		for(let key in str){
    			newobj[key]=encodeURIComponent(str[key])
    		}
    		return newobj
    	}else if('object'===typeof str && strType==='decode'){
    		let newobj={}
    		for(let key in str){
    			newobj[key]=decodeURIComponent(str[key])
    		}
    		return newobj
    	}else{
    		throw '请输入字符串或对象类型和正确的操作类型'
    	}
    	
    }
}