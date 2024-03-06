module.exports = (app) => {
  const path = app.locals.path;

  // dashboard
  const routerDashboard = require("./dashboard.router.js");
  app.use(path.admin_dashboard, routerDashboard);

  // product
  const routerProduct = require("./product.router.js");
  app.use(path.admin_product, routerProduct);
  
  // category
  const routerCategory = require("./category.router.js");
  app.use(path.admin_category, routerCategory);

  //roles
  const routerRoles = require("./roles.router.js");
  app.use(path.admin_roles,routerRoles);
};
