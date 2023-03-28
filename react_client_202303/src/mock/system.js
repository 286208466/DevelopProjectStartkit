import Mock from "mockjs";
import { userInfo, auths } from "./commonData";
Mock.mock("/api/v1/system/login", "post", {
  code: 200,
  data: {
    token: "123456",
    userInfo: {
      ...userInfo,
      auths: auths,
    },
  },
  message: "",
});

Mock.mock("/api/v1/system/logout", "post", {
  code: 200,
  data: {},
  message: "系统繁忙",
});

Mock.mock("/api/v1/auditChain/list", "post", {
  code: 200,
  data: {
    rows: [
      {
        chain_len: 4054,
        create_time: 1629169537844,
        creator_name: "vexvaidyclpqwcnfxwxpcvjcjmelgals",
        id: 1,
        is_del: 0,
        name: "vgyugyjdyrrcuqheydhilhkppdxbrfln",
        remark: null,
        type: 8067,
        update_time: null,
        updater: null,
      },
      {
        chain_len: 9098,
        create_time: 1629169537855,
        creator_name: "excsnrkkzqejzhddilugeadhbgskktwr",
        id: 2,
        is_del: 0,
        name: "zqppbrmyqryzjueuwdouahsaklonoyim",
        remark: null,
        type: 2892,
        update_time: null,
        updater: null,
      },
    ],
    total: 2,
  },
  message: "系统繁忙",
});
Mock.mock("/api/v1/auditChain/del", "post", {
  code: 200,
  data: {},
  message: "系统繁忙",
});
