// 清除所有空格
export const trim = (str: string) => str.replace(/\s/g, "");

// 转json
export const toJson = (json = "[]", defaults = []) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return defaults;
  }
};

// 转json字符串
export const toJsonText = (data: object, defaults = "{}") => {
  try {
    return JSON.stringify(data, null, 4);
  } catch (e) {
    return defaults;
  }
};
