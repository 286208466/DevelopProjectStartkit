import Mock from "mockjs";

Mock.mock("/api/system/login", "post", {
  code: 200,
  data: {
    username: "qqwwee",
    token: "123456",
  },
  message: "",
});

Mock.mock("/api/system/logout", "post", {
  code: 200,
  data: {},
  message: "系统繁忙",
});
