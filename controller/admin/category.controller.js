module.exports.index = async (req,res) => {
    res.render("admin/page/category/index.pug",{
        pageTitle:"Danh mục sản phẩm"
    })
}