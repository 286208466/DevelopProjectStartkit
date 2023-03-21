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


