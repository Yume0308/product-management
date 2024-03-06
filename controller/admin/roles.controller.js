module.exports.index =async (req,res) => {
    res.render("admin/page/roles/index.pug",{
        pageTitle:"Trang phân quyền"
    })
}