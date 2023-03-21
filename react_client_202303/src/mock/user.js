import Mock from "mockjs";

Mock.mock("/api/user/detail", "post", {
  code: 200,
  data: {
    username: "qqwwee",
    email: "123456",
    phone: "123",
  },
  message: "",
});

Mock.mock("/api/user/update", "post", {
  code: 200,
  data: {},
  message: "系统繁忙",
});
