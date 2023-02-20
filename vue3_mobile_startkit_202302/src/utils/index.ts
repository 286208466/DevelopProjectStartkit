import axios from "axios";

var utils = {};



/**
 * 根据参数名获取url中参数的值
 * @param	{ name = string } 参数名
 */
utils.getUrlParam = function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); 
    return null;
}

/**
 * 根据路径下载文件
 * @param { filepath = string } 文件路径 
 */
utils.download = function(filepath){
    var iframe = document.getElementById("downloadframe");
    if(iframe){
        iframe.src = filepath;
    }else{
        iframe = document.createElement("iframe");
        iframe.src = filepath;
        iframe.style.display = "none";
        iframe.id = "downloadframe";
        document.body.appendChild(iframe);
    }
}


utils.goTop = function(){
    (function smoothscroll(){  
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;  
        if(currentScroll > 0){  
            window.requestAnimationFrame(smoothscroll);  
            window.scrollTo (0, currentScroll - (currentScroll/5));  
        }  
    })();
}

/**
* 判断是否是PC端
*/
utils.isPc = function(){
    var userAgentInfo = navigator.userAgent;  
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true;  
    for (var v = 0; v < Agents.length; v++) {  
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
    }  
    return flag; 
}
/**
 * 字符串转义（防XSS攻击）
 * @param { str = string } html字符串 
 */
utils.escape = function(str){
    return String(str).replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 设置cookie
 * @param { key = string } key 
 * @param { value = string } value 
 * @param { exp = int } 过期时间（天） 
 */
utils.setCookie = function(key, value, exp){
    var date = new Date();
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = key + "=" + value + expires + "; path=/";
}

/**
 * 获取cookie的值
 * @param { key= string } key 
 */
utils.getCookie = function(key){
    let nameEQ = key + "=";
    let ca = document.cookie.split(';');
    for (let i = 0, max = ca.length; i < max; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

/**
 * 过滤字符串左右两边的空字符串
 * @param { str = string } str 
 */
utils.trim = function(str){
    str = typeof str === 'string' ? str : '';
    return str.trim ? str.trim() : str.replace(/^\s|\s$/g, '');
}

/**
 * 微博话题正则
 * @param { str = string } str 
 */
utils.getTopic = function(str){
    var re = /\#([^\#|.]+)\#/g;
    var reg = new RegExp("\#([^\#|.]+)\#", "ig")     // 创建正则对象
    return str.match(re);
}

utils.replaceTopic = function(str){
    var r, re;    // 声明变量。
    var ss = str;
    r = ss;
    re = /\#([^\#|.]+)\#/g;
    reg = new RegExp("\#([^\#|.]+)\#", "ig")     // 创建正则对象
    if((result = reg.exec(ss)) !=null){
            r = ss.replace(re, '<a class="topicName" title="'+result[1]+'">'+result[0]+'</a>');
    }
    return(r);    //返回替换后的字符串
}

/**
 * 判断是安卓还是ios
 */
utils.isAndroid = function(){
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isAndroid == true ? true : false;
}
/**
 * 获取IE的版本
 */
utils.getIEVersion = function(){
    var ua = navigator.userAgent, matches, tridentMap = {'4': 8, '5': 9, '6': 10, '7': 11};
    matches = ua.match(/MSIE (\d+)/i);
    if(matches && matches[1]){
            return +matches[1];
    }
    matches = ua.match(/Trident\/(\d+)/i);
    if(matches && matches[1]){
            return tridentMap[matches[1]] || null;
    }
    return null;
}

/**
 * ajax封装
 * @param { params = object } params 
 * @example 
 * 	utils.ajax({
 * 		url: "",
 * 		data: {},
 * 		showLoading: true,
 * 		type: "get",
 * 		success: function(data){},
 * 		error: function(err){}
 * 	})
 */
utils.ajax = function(params){
    var type = params.type || "post";
    var data = params.data || {};
    var showLoading = params.showLoading || false;
    if(showLoading){

    }
    if(!params.url){
            return;
    }
    if(type == "get"){
        axios.get(params.url, {params: data}).then(function(data){
            data = data.data;
            if(data.success){
                    params.success && params.success(data);
            }else{

            }
            if(showLoading){

            }
        }).catch(function(err){
            params.error && params.error(err);
            if(showLoading){

            }
        })
    }else{
        axios.post(params.url, data).then(function(data){
            data = data.data;
            if(data.success){
                    params.success && params.success(data);
            }else{

            }
            if(showLoading){

            }
        }).catch(function(err){
            params.error && params.error(err);
            if(showLoading){

            }
        })
    }
}

/**
 * html转文本
 * @param { val = string } val 
 */
utils.html2Text = function(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

/**
 * 触发el的点击事件
 * @param { el = object } el:dom对象 
 */
utils.triggerClick = function(el){
	if(document.all){
        el.click();
	}else{
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        el.dispatchEvent(e);
	}
}

/**
 * 
 * @param {*} element 
 * @param {*} className 
 */
utils.toggleClass = function(element, className) {
    if (!element || !className) {
        return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
        classString += '' + className
    } else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
    }
    element.className = classString
}

/**
 * 
 * @param {*} element 
 * @param {*} to 
 * @param {*} duration 
 */
utils.scrollTo = function(element, to, duration) {
    if (duration <= 0) return
    const difference = to - element.scrollTop
    const perTick = difference / duration * 10
    setTimeout(() => {
        console.log(new Date())
        element.scrollTop = element.scrollTop + perTick
        if (element.scrollTop === to) return
        scrollTo(element, to, duration - 10)
    }, 10)
}

/**
 * 数组去重
 * @param {arr = Array} arr 
 */
utils.uniqueArr = function(arr) {
    return Array.from(new Set(arr))
}

export default utils

/*
-------------------------------------------------------
日期格式化
示例
alert(new Date().format("yyyy年MM月dd日"));
alert(new Date().format("MM/dd/yyyy"));
alert(new Date().format("yyyyMMdd"));
alert(new Date().format("yyyy-MM-dd hh:mm:ss"));
--------------------------------------------------------
Date.prototype.format = function(format){
	var o = {
	"M+" : this.getMonth()+1, //month
	"d+" : this.getDate(), //day
	"h+" : this.getHours(), //hour
	"m+" : this.getMinutes(), //minute
	"s+" : this.getSeconds(), //second
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter
	"S" : this.getMilliseconds() //millisecond
	}
	
	if(/(y+)/.test(format)) {
	    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	
	for(var k in o) {
	    if(new RegExp("("+ k +")").test(format)) {
	        format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
	    }
	}
	return format;
}
*/

export function parseTime(time, cFormat) {
	  if (arguments.length === 0) {
	    return null
	  }
	  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	  let date
	  if (typeof time === 'object') {
	    date = time
	  } else {
	    if (('' + time).length === 10) time = parseInt(time) * 1000
	    date = new Date(time)
	  }
	  const formatObj = {
	    y: date.getFullYear(),
	    m: date.getMonth() + 1,
	    d: date.getDate(),
	    h: date.getHours(),
	    i: date.getMinutes(),
	    s: date.getSeconds(),
	    a: date.getDay()
	  }
	  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
	    let value = formatObj[key]
	    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
	    if (result.length > 0 && value < 10) {
	      value = '0' + value
	    }
	    return value || 0
	  })
	  return time_str
	}


export function formatTime(time, option) {
	  time = +time * 1000
	  const d = new Date(time)
	  const now = Date.now()

	  const diff = (now - d) / 1000

	  if (diff < 30) {
	    return '刚刚'
	  } else if (diff < 3600) { // less 1 hour
	    return Math.ceil(diff / 60) + '分钟前'
	  } else if (diff < 3600 * 24) {
	    return Math.ceil(diff / 3600) + '小时前'
	  } else if (diff < 3600 * 24 * 2) {
	    return '1天前'
	  }
	  if (option) {
	    return parseTime(time, option)
	  } else {
	    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
	  }
}

export function objectMerge(target, source) {
	  /* Merges two  objects,
	     giving the last one precedence */

	  if (typeof target !== 'object') {
	    target = {}
	  }
	  if (Array.isArray(source)) {
	    return source.slice()
	  }
	  Object.keys(source).forEach((property) => {
	    const sourceProperty = source[property]
	    if (typeof sourceProperty === 'object') {
	      target[property] = objectMerge(target[property], sourceProperty)
	    } else {
	      target[property] = sourceProperty
	    }
	  })
	  return target
}



/*
//获取textarea光标位置
    getTextareaPosition: function(textarea){
    	var rangeData = {text: "", start: 0, end: 0 };
		if(textarea.setSelectionRange){ // W3C	
			textarea.focus();
			rangeData.start= textarea.selectionStart;
			rangeData.end = textarea.selectionEnd;
			rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): "";
		}else if(document.selection){ // IE
			textarea.focus();
			var i,
				oS = document.selection.createRange(),
				// Don't: oR = textarea.createTextRange()
				oR = document.body.createTextRange();
			oR.moveToElementText(textarea);
			
			rangeData.text = oS.text;
			rangeData.bookmark = oS.getBookmark();
			
			// object.moveStart(sUnit [, iCount]) 
			// Return Value: Integer that returns the number of units moved.
			for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i ++) {
				// Why? You can alert(textarea.value.length)
				if (textarea.value.charAt(i) == '\r' ) {
					i ++;
				}
			}
			rangeData.start = i;
			rangeData.end = rangeData.text.length + rangeData.start;
		}
		
		return rangeData;
    	
    },
    setTextareaPosition: function(textarea, rangeData){
    	var oR, start, end;
		if(!rangeData){
			alert("You must get cursor position first.")
		}
		textarea.focus();
		if(textarea.setSelectionRange){ // W3C
			textarea.setSelectionRange(rangeData.start, rangeData.end);
		}else if(textarea.createTextRange){ // IE
			oR = textarea.createTextRange();
			
			// Fixbug : ues moveToBookmark()
			// In IE, if cursor position at the end of textarea, the set function don't work
			if(textarea.value.length === rangeData.start) {
				//alert('hello')
				oR.collapse(false);
				oR.select();
			} else {
				oR.moveToBookmark(rangeData.bookmark);
				oR.select();
			}
		}
    },
    addTextareaText: function(textarea, rangeData, text){
    	var oValue, nValue, oR, sR, nStart, nEnd, st;
		this.setTextareaPosition(textarea, rangeData);
		
		if (textarea.setSelectionRange) { // W3C
			oValue = textarea.value;
			nValue = oValue.substring(0, rangeData.start) + text + oValue.substring(rangeData.end);
			nStart = nEnd = rangeData.start + text.length;
			st = textarea.scrollTop;
			textarea.value = nValue;
			// Fixbug:
			// After textarea.values = nValue, scrollTop value to 0
			if(textarea.scrollTop != st) {
				textarea.scrollTop = st;
			}
			textarea.setSelectionRange(nStart, nEnd);
		} else if (textarea.createTextRange) { // IE
			sR = document.selection.createRange();
			sR.text = text;
			sR.setEndPoint('StartToEnd', sR);
			sR.select();
		}
    	
    },
*/


