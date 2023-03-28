/**
 * 插入标签到页面
 * @param  {HTMLElement} element              待插入元素
 * @param  {HTMLElement} body = document.body 插入的容器
 * @return {Promise}                          标签插入后返回
 */
export const installElement = (element: HTMLElement, body = document.body) =>
  new Promise((resolve) => {
    body.appendChild(element);
    if (
      element instanceof HTMLLinkElement ||
      element instanceof HTMLScriptElement
    ) {
      element.onload = () => resolve(element);
    } else {
      resolve(element);
    }
  });

/**
 * 插入脚本
 * @param {string} src 脚本地址
 */
export const installScript = (src: string) => {
  const script = document.createElement("script");
  script.src = src;
  return installElement(script);
};

/**
 * 插入样式
 * @param {string} href 样式地址
 */
export const installLink = (href: string) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  return installElement(link);
};

/**
 * 判断dom对象是否包含某个class
 * 
*/
export function hasClass(el, cName) {
  return !!el.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
}

/**
 * 给dom对象添加某个class
 * 
*/
export function addClass(el, cName) {
  if (!hasClass(el, cName)) {
    el.className += " " + cName;
  }
}

/**
 * 删除dom对象的某个class
 * 
*/
export function removeClass(el, cName) {
  if (hasClass(el, cName)) {
    el.className = el.className.replace(
      new RegExp("(\\s|^)" + cName + "(\\s|$)"),
      " "
    );
  }
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += "" + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}


