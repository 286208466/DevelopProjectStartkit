import Vue from "vue"
import axios from "axios";
import router from "../../router"
import {Message} from "element-ui"

var utils = {};

//根据url参数名称获取参数的值
utils.getUrlParam = function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); 
    return null;
}

//iframe下载文件
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

//返回顶部
utils.goTop = function(){
    /*(function smoothscroll(){  
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;  
        if(currentScroll > 0){  
            window.requestAnimationFrame(smoothscroll);  
            window.scrollTo (0, currentScroll - (currentScroll/5));  
        }  
    })();  */
    $("html, body").stop().animate({
        scrollTop: 0
    }, 300);
}

//获取IE版本
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

//是否是PC端
utils.isPc = function(){  
    var userAgentInfo = navigator.userAgent;  
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true;  
    for (var v = 0; v < Agents.length; v++) {  
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
    }  
    return flag;  
}


//获取随机颜色
utils.getRandomColor = function(){
    return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
}

//过滤表情
utils.filteremoji = function(content){
    var ranges = [  
        '\ud83c[\udf00-\udfff]',  
        '\ud83d[\udc00-\ude4f]',  
        '\ud83d[\ude80-\udeff]'  
    ];  
    var emojireg = content.replace(new RegExp(ranges.join('|'), 'g'), '');  
    return emojireg;  
}

//计算字节
utils.countByte =  function(s){
    var len = 0;  
    for (var i=0; i<s.length; i++) {   
        var c = s.charCodeAt(i);   
        //单字节加1   
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {   
            len++;   
        } else {   
            len += 2;   
        }   
    } 
    return len;
}

//验证url
utils.isUrl = function(str){
    return /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
}

//过滤XSS攻击
utils.escape = function(str){
    return String(str).replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

//加载js
utils.loadScript = function(url, callback){
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        }
    } else {
        script.onload = function(){
            callback();
        }
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

//设置cookie
utils.setCookie = function(key, value, exp){
    var date = new Date();
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = key + "=" + value + expires + "; path=/";
}

//获取cookie
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

//去掉2边空格
utils.trim = function(str){
    str = typeof str === 'string' ? str : '';
    return str.trim
        ? str.trim()
        : str.replace(/^\s|\s$/g, '');
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
    var self = this;
    var type = params.type || "post";
    var data = params.data || {};
    var showLoading = params.showLoading || false;
    if(showLoading){

    }
    if(!params.url){
        return;
    }
    //axios.defaults.headers.common['token'] = "123456"
    if(type == "get"){
        axios.get(params.url, {params: data}).then(function(data){
            data = data.data;
            if(data.code == "0000"){
                params.success && params.success(data);
            }else if(data.code == "2100"){
                router.push({
                    path: '/login'
                })
            }else{
                Message.error(data.msg);
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
            if(data.code == "0000"){
                    params.success && params.success(data);
            }else if(data.code == "2100"){
                router.push({
                    path: '/login'
                })
            }else{

            }
            if(showLoading){
                Message.error(data.msg);
            }
        }).catch(function(err){
            params.error && params.error(err);
            if(showLoading){

            }
        })
    }
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

export function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
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

export function scrollTo(element, to, duration) {
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

export function toggleClass(element, className) {
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

export function uniqueArr(arr) {
    return Array.from(new Set(arr))
}






