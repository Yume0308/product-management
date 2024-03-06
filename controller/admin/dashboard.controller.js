// [GET]/admin/dashboard

module.exports = async (req, res) => {
  res.render("admin/page/dashboard/index.pug", {
    pageTitle: "Trang chủ Admin",
    title: "Trang chủ admin",
  });
};


