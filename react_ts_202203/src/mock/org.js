import Mock from "mockjs";

Mock.mock("/api/system/org/list", "post", {
  code: 200,
  data: {
    total: 1,
    rows: [
      {
        id: 1,
        name: "香蜜湖校区",
        parent_name: "",
        type: 1,
        remark: "香蜜湖校区",
      },
    ],
  },
  message: "系统繁忙",
});

Mock.mock("/api/system/org/getOrgById", "post", {
  code: 200,
  data: [
    {
      id: "10000",
      org_id: "10000",
      name: "香蜜湖校区",
      parent_id: "0",
      parent_name: "",
      type: "",
      remark: "",
      children: [
        {
          id: "10001",
          org_id: "10001",
          name: "中学部",
          parent_id: "10000",
          parent_name: "香蜜湖校区",
          type: "",
          remark: "",
          children: [],
        },
        {
          id: "10002",
          org_id: "10002",
          name: "小学部",
          parent_id: "10000",
          parent_name: "香蜜湖校区",
          type: "",
          remark: "",
          children: [],
        },
      ],
    },
  ],
  message: "系统繁忙",
});

Mock.mock("/api/system/org/remove", "post", {
  code: 200,
  data: {},
  message: "系统繁忙",
});

Mock.mock("/api/system/org/save", "post", {
  code: 200,
  data: {},
  message: "系统繁忙",
});
