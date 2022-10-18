;(function(){

    

}());

var sim = {
    show: function(ele){
        ele.style.display = "block";
    },
    hide: function(ele){
        ele.style.display = "none";
    },

    append: function(ele, child){
        ele.appendChild(child);
    },
    remove: function(ele){
        ele.parentNode.removeChild(ele);
    },
    prepend: function(ele, newEle){
        ele.innerHTML = newEle + ele.innerHTML; 
    },
    after: function(ele, newEle){
        ele.outerHTML += newEle; 
    },
    before: function(ele, newEle){
        ele.outerHTML = newEle + ele.outerHTML; 
    },
    replaceWith: function(ele, newEl){ 
    	ele.outerHTML = newEl; 
    },

    parent: function(ele){
        return ele.parentNode
    },
    child: function(ele){
        return ele.childNodes;
    },
    next: function(ele){
        return ele.nextElementSibling;
    },
    prev: function(ele){
        return ele.previousElementSibling;
    },

    css: function(ele){
        if(arguments.length == 2){ 
            return eval("ele.style." + arguments[1]); 
        }else if(arguments.length == 3){ 
            eval("ele.style." + arguments[1] + "='" + arguments[2]+"'"); 
        } 
    },
    attr: function(ele){
        if(arguments.length == 2){ 
			return ele.getAttribute(arguments[1]); 
		}else if(arguments.length == 3){ 
			ele.setAttribute(arguments[1], arguments[2]);
		}
    },
    html: function(ele){
        if(arguments.length == 1){ 
    		return ele.innerHTML; 
    	}else if(arguments.length == 2){ 
    		ele.innerHTML = arguments[1]; 
    	} 
    },
    val: function(ele){
        if(arguments.length == 1){ 
    		return ele.value; 
    	}else if(arguments.length == 2){ 
    		ele.value = arguments[1]; 
    	}
    },

    hasClass: function(ele, name){
        //return ele.classList.contains(name) 
        return !!ele.className.match( new RegExp( "(\\s|^)" + name + "(\\s|$)") );
    },
    addClass: function(ele, name){
        if(!this.hasClass(ele, name)){ 
            //ele.classList.add(name); 
            ele.className += " " + name;
        } 
    },
    removeClass: function(ele, name){
        if(this.hasClass(ele, name)){ 
            //ele.classList.remove(name);
            ele.className = ele.className.replace( new RegExp( "(\\s|^)" + name + "(\\s|$)" )," " ); 
        } 
    },

    bind: function(ele, eventName, fn){
        if(window.attachEvent){ 
    		ele.attachEvent("on" + eventName, fn); 
    	}else{  
    		ele.addEventListener(eventName, fn, false); 
    	}
    }
};

Object.assign(sim, {
    showLoading: function(text){
        text = text || "数据加载中"
        var html = '<div id="loadingToast">' + 
                        '<div class="mask_transparent"></div>' + 
                        '<div class="toast"><i class="loading icon_toast"></i><p class="toast_content">' + text + '</p>' + 
                        '</div>' + 
                    '</div>'
        var toast = document.getElementById("loadingToast");
        if(toast.length == 0){
            document.body.appendChild(html);
        }else{
            if(sim.hasClass(toast, "show")){

            }
        }
        
            
            
        
    
    }
})

export default sim