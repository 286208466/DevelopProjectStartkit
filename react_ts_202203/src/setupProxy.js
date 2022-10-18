const { createProxyMiddleware } = require("http-proxy-middleware");
let test = "http://112.91.137.136";
let dev = "http://127.0.0.1:5000";
module.exports = function (app) {
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
