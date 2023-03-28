import axios from "@/axios";
//递归遍历删除authList的空children
const forEachToDelNullChildren = function (obj) {
  if (obj.children && obj.children.length > 0) {
    obj.children.forEach((item) => {
      forEachToDelNullChildren(item);
    });
  } else {
    delete obj.children;
  }
};
export function getAuthTree() {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/v1/auth/getTreeById", {
        auth_id: "0",
      })
      .then((res) => {
        res = res.data;
        
        res.forEach((item) => {
          forEachToDelNullChildren(item);
        });
        let tree = [...res];
        resolve(tree);
      })
      .catch((err) => {});
  });
}
