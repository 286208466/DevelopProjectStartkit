const baseURL = {
  // dev: '//localhost:4399/',
  development: "//qyhever.com/e-admin",
  production: "//qyhever.com/e-admin"
}[process.env.NODE_ENV];

export default {
  debug: true,
  fixedHeader: false,
  sidebarLogo: true,
  showSettings: true,
  tagsView: true,
};
