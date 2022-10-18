import Mock from "mockjs";

Mock.mock("/api/system/role/list", "post", {
  code: 200,
  data: {
    total: 1,
    rows: [
      {
        id: 1,
        role_id: 1,
        name: "管理员",
        type: 1,
        userNum: 10,
        remark: "",
        auth_ids: "10001, 10000",
      },
      {
        id: 2,
        role_id: 2,
        name: "财务",
        type: 2,
        userNum: 1,
        remark: "",
        auth_ids: "10001, 10000",
      },
    ],
  },
  message: "系统繁忙",
});

Mock.mock("/api/system/role/detail", "post", {
  code: 200,
  data: {
    id: 2,
    role_id: 2,
    name: "财务",
    type: 1,
    remark: "",
    auth_ids: "10001, 10000",
  },
  message: "系统繁忙",
});

Mock.mock("/api/system/role/remove", "post", {
  code: 200,
  data: {},
  message: "系统繁忙",
});

Mock.mock("/api/system/role/save", "post", {
  code: 200,
  data: {},
  message: "系统繁忙",
});
