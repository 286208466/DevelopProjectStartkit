import axios from "@/axios";

const forEach2Tree = function (obj) {
  obj.title = obj.name;
  obj.key = obj.department_id;
  obj.value = obj.department_id;
  if (obj.children && obj.children.length > 0) {
    obj.children.forEach((item) => {
      forEach2Tree(item);
    });
  }
};

export function getDepartmentTree() {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/v1/department/getTreeById", {
        department_id: "0",
      })
      .then((res) => {
        res = res.data;
        res.forEach((item) => {
          forEach2Tree(item);
        });
        let tree = [...res];
        resolve(tree);
      })
      .catch((e) => {});
  });
}
