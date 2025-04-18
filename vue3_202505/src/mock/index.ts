import { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/api/v1/base/login",
    method: "post",
    response: () => {
      return {
        code: 200,
        msg: "",
        data: { token: 123 },
      };
    },
  },
] as MockMethod[];
