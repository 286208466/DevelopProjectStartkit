import Mock from "mockjs";
import { auths } from "./commonData";

Mock.mock("/api/system/auth/getAuthById", "post", {
  code: 200,
  data: auths,
  message: "",
});

Mock.mock("/api/system/auth/del", "post", {
  code: 200,
  data: {},
  message: "系统繁忙",
});

Mock.mock("/api/system/auth/save", "post", {
  code: 200,
  data: {},
  message: "系统繁忙",
});
