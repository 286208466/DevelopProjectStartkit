import request from "../axios";

export const fetchData = (query) => {
  return request({
    url: "./table.json",
    method: "get",
    params: query,
  });
};
