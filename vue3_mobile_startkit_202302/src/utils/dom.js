const $show = (ele) => {
  ele.style.display = "block";
};

const $hide = (ele) => {
  ele.style.display = "none";
};

const $append = (ele, child) => {
  ele.appendChild(child);
};

const $remove = (ele) => {
  ele.parentNode.removeChild(ele);
};

const $prepend = (ele, newEle) => {
  ele.innerHTML = newEle + ele.innerHTML;
};

const $after = (ele, newEle) => {
  ele.outerHTML += newEle;
};

const $before = (ele, newEle) => {
  ele.outerHTML = newEle + ele.outerHTML;
};

const $replaceWith = (ele, newEl) => {
  ele.outerHTML = newEl;
};

const $parent = (ele) => {
  return ele.parentNode;
};

const $child = (ele) => {
  return ele.childNodes;
};
const $next = (ele) => {
  return ele.nextElementSibling;
};
const $prev = (ele) => {
  return ele.previousElementSibling;
};

const $css = (ele) => {
  if (arguments.length == 2) {
    return eval("ele.style." + arguments[1]);
  } else if (arguments.length == 3) {
    eval("ele.style." + arguments[1] + "='" + arguments[2] + "'");
  }
};
const $attr = (ele) => {
  if (arguments.length == 2) {
    return ele.getAttribute(arguments[1]);
  } else if (arguments.length == 3) {
    ele.setAttribute(arguments[1], arguments[2]);
  }
};
const $html = (ele) => {
  if (arguments.length == 1) {
    return ele.innerHTML;
  } else if (arguments.length == 2) {
    ele.innerHTML = arguments[1];
  }
};
const $val = (ele) => {
  if (arguments.length == 1) {
    return ele.value;
  } else if (arguments.length == 2) {
    ele.value = arguments[1];
  }
};

const $hasClass = (ele, name) => {
  //return ele.classList.contains(name)
  return !!ele.className.match(new RegExp("(\\s|^)" + name + "(\\s|$)"));
};
const $addClass = (ele, name) => {
  if (!this.hasClass(ele, name)) {
    //ele.classList.add(name);
    ele.className += " " + name;
  }
};
const $removeClass = (ele, name) => {
  if (this.hasClass(ele, name)) {
    //ele.classList.remove(name);
    ele.className = ele.className.replace(
      new RegExp("(\\s|^)" + name + "(\\s|$)"),
      " "
    );
  }
};

const $bind = (ele, eventName, fn) => {
  if (window.attachEvent) {
    ele.attachEvent("on" + eventName, fn);
  } else {
    ele.addEventListener(eventName, fn, false);
  }
};
