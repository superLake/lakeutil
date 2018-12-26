/*
* @Author: sznews
* @Date:   2018-12-21 09:18:20
* @Last Modified by:   sznews
* @Last Modified time: 2018-12-21 23:11:24
*/
_={
	/*
	*通用事件绑定函数
	*/
	bindEvent:function(domObj,event,selector,fn){
		if(!fn){
			fn=selector;
			selector=null;
		}
		domObj.addEventListener(event,function(e){
			var target;
			if(selector){
				target=e.target;
				if(target.matches(selector)){
					fn.call(target,e);
				}	
			}else{
				fn(e);
			}
		});
	},

	/*
	*通用数组、对象对象遍历
	*/
	forEach:function(obj,fn){
		if(obj instanceof Array){
			obj.forEach(function(item,index){
				fn(item,index);
			});
		}else{
			for(key in obj){
				fn(obj,key);
			}
		}
	},
	/*
	*获取url参数
	*/
	getUrlParmName:function(name){
		var regExp=new regExp('(^|&)'+name+'=([^&]*)(&|$)');
		var result=window.location.search.substr(1).match(reg);
		return result?decodeURIComponent(result[2]):null;
	}
}