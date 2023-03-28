import Mock from "mockjs";

Mock.mock("/api/v1/hourRecSummery", "post", {
  code: 200,
  data: {
    rows: [
      {
        n_audited: 20,
        n_auditing: 45,
        n_not_recorded: 23,
        n_recorded: 34,
        n_reject: 32,
        time_tag: 1620604800000,
      },
      {
        n_audited: 20,
        n_auditing: 45,
        n_not_recorded: 23,
        n_recorded: 34,
        n_reject: 32,
        time_tag: 1620704800000,
      },
    ],
    total: 2,
  },
  message: "系统繁忙",
});

Mock.mock("/api/v1/hourRec/list", "post", {
  code: 200,
  data: {
    rows: [
      {
        audit_record_id: null,
        create_time: 1629253734714,
        creator_name: "qwpedrpoqpndiawnhkkhluflmzmlmhlz",
        hours: 280.4,
        id: 1,
        is_del: 0,
        name: "uibihzlwbsjvoynpyjnjiuotxgyownxx",
        orgs: [],
        phone: null,
        status: 1,
        time_tag: 6994,
        update_time: null,
        updater: null,
        user_id: "82ddd916-43b8-4d9d-b0d9-9ae583028c89",
      },
      {
        audit_record_id: null,
        create_time: 1629253734726,
        creator_name: "ocuzatqwbribswikfhimicutuufyhmnh",
        hours: 916.96,
        id: 2,
        is_del: 0,
        name: "voqdufnouahvxlwjywozvoobjkuuvmnn",
        orgs: [],
        phone: null,
        status: 1,
        time_tag: 6483,
        update_time: null,
        updater: null,
        user_id: "58c27b1b-a35a-4546-bf6e-697bc9041a3e",
      },
    ],
    total: 5,
  },
  message: "系统繁忙",
});

Mock.mock("/api/v1/hourRate/list", "post", {
  code: 200,
  data: {
    rows: [
      {
        create_time: 1629250261207,
        creator_name: "etnzswvqvrdzbnvoiixtdurkzwbsqinr",
        department: "xoixhfjlybirgkbcujekstscscsjqhty",
        id: 1,
        is_del: 0,
        rate: 685.53,
        region: "rtzjwyuxhxtopnqcrzxpzrjbwevftowf",
        remark: null,
        subject: "zpepmelkveknnudkraqsfptgndghyfot",
        type: 3,
        update_time: null,
        updater: null,
      },
    ],
    total: 1,
  },
  message: "系统繁忙",
});

Mock.mock("/api/v1/hourRate/del", "post", {
  code: 200,
  data: {},
  message: "系统繁忙",
});
