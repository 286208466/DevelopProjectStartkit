let { createProxyMiddleware } = require("http-proxy-middleware");
// let testApi: string = "http://127.0.0.1:8080";
// let devApi: string = "http://127.0.0.1:8080";
var test = "http://112.91.137.136";
var dev = "http://127.0.0.1:5000";
module.exports = function (app: any) {
  // app.use(
  //   createProxyMiddleware("/api", {
  //     target: testApi,
  //   })
  // );
  app.use(
    "/backend",
    createProxyMiddleware("/backend", {
      target: test,
    })
  );
  app.use(
    "/api",
    createProxyMiddleware("/api", {
      target: dev,
    })
  );
};
