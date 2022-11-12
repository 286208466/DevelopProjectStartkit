import Mock from "mockjs";

Mock.mock("/api/system/log/list", "post", {
  code: 200,
  data: {
    rows: [
      {
        create_time: "2021-08-13 16:40:21",
        creator_name: "qeqdusxlcmkdzzfvjptstrksnyaeoawq",
        id: 1,
        is_del: 0,
        operate_ip: "spvbnpilygtozgkcsmfmjdyxayzowjoq",
        operate_time: 3966,
        operator: "widaewbyyxpwnfnbxbmgcxmnsqwmaavd",
        remark: "csjerkqlnx",
        type: 1,
        type_text: "ycrjpzbnpzqwupridvcuqdqpybzhqdbh",
        update_time: null,
        updater: null,
      },
    ],
    total: 1,
  },
  message: "系统繁忙",
});
