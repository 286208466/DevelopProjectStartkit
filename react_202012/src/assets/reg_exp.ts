// 数字
export const number = /^[0-9]*$/;

// 汉字
export const chinese = /^[\u4e00-\u9fa5]{0,}$/;

// 字母和数字
export const lettersNumber = /^[A-Za-z0-9]+$/;

// 单字节
export const singleByte = /^[\x00-\xff]+$/;

// 手机号码
export const phone = /^1[345789][1-9]\d{8}$/;

// 车牌号码
export const licensePlateNumber = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;

// 图片格式
export const image = /^image\/(bmp|gif|png|jpe?g)$/;

// 身份证号码
export const idNumber = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;

// 驾照
export const driverLicense = idNumber;

// 非空格
export const space = /^[\s\S]*.*[^\s][\s\S]*$/;
