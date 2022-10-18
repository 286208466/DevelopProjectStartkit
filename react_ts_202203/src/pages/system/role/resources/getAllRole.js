import axios from "@/axios";

export function getAllRole() {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/v1/position/role/getAll", {})
      .then((res) => {
        res = res.data;
        let tree = [...res.rows];
        resolve(tree);
      })
      .catch((e) => {});
  });
}
