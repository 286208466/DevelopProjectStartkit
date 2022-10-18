let { createProxyMiddleware } = require("http-proxy-middleware");
let testApi: string = "http://127.0.0.1:8080";
// let devApi: string = "http://127.0.0.1:8080";
module.exports = function (app: any) {
  app.use(
    createProxyMiddleware("/api", {
      target: testApi,
    })
  );
};
