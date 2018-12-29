/*
* @Author: sznews
* @Date:   2018-12-29 10:29:17
* @Last Modified by:   sznews
* @Last Modified time: 2018-12-29 15:39:46
*/
// JS编程时应注意的细节
// 1、判断一个变量是否为对象时，要先判断是否为null，因为
typeof null==='object' //true

// 所以判断用typeof判断变量是否为object的正确姿势应该是：
var someVal={} //Array,Object,function等等
if(someVal!==null&&typeof someVal==='object'){
	//do something
}


// 2、调用立即执行函数时,我们习惯
//（立即执行函数作用是为了创建一个函数级作用域）
(function(){
	//do something
})()
//但是根据stardardjs规范，行首不能以括号，
//为什么，因为根据这个规定，语句间可以不用;隔开，
//这就导致以下问题
var a=1;
(function(){
	//do something
})()
//系统认为a=1调用了下面的函数，所以会报：
//TypeError: 1 is not a function
//所以应该这样写:
void function(){
	//do something
}()



//3、判断两个小数是否相等不要用===
//因为0.3===0.3有可能是false，例如运算时
var b=0.1+0.2
console.log(b===0.3)//false
// 所以判断两个小数是否相等，要习惯用绝对值比较
console.log(Math.abs(b-0.3)<=1e-10)//true
//注意：1e的1是yi不是L，是yi不是L，是yi不是L


//4、不要随便用==
console.log(null==undefined)//true
console.log('123'==123)//true
//什么时候可以用呢
//同时判断变量是不是等于null或undefined就可以用了
var c=null;
var d;
console.log(c==null);//true
console.log(d==null);//true
console.log(c==undefined);//true
console.log(d==undefined);//true
console.log(c==d);//true
console.log(c===d);//false

var e=[];
if(e==null){
	//do something
}
//这样就可以同时判断e是不是null或undefined了
//PS：除了这种情况，其他情况一律用===


//5、日期处理
// 注意月份是从0开始的，0就是1月
var date=new Date(99,11,20);
console.log(date);//1999-12-19T16:00:00.000Z

//6、慎用||填充默认值
// ||的作用是当左边可以转化为true就返回左边的值，否则返回右边的默认值
// 情况一
console.log(10||9);       //10
// 情况二
console.log('abc'||'def');//abc
// 情况三
console.log(0||9);		  //9
// 情况四
console.log(''||'def');   //def
// 但是有一种情况用户想要输入0（第三种情况），由于0会转为false，那就会被迫转为默认值，
//其实我们要判断的并不是0或者''，我们应该关注的是undefined，亦就是当用户没有输入的情况才用默认值
// 所以最好就是用三目运算符代替
var parm={
	// bool:false,
	num:0,
	str:'haha'
}
console.log(parm.bool!==undefined?parm.bool:true)//true
console.log(typeof parm.num?parm.num:9)//0
console.log(typeof parm.str?parm.str:'def')//haha

//