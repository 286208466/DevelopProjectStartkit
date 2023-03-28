import Mock from "mockjs";
Mock.mock("/api/v1/salary/taxe/list", "post", {
  code: 200,
  data: {
    total: 1,
    rows: [
      {
        id: 1,
        name: "张三",
        mobile: "17712341234",
        status: 1,
      },
    ],
  },
  message: "系统繁忙",
});

Mock.mock("/api/v1/classTime/salarySetting/remove", "post", {
  code: 200,
  data: {},
  message: "系统繁忙",
});
