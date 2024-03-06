const product = require("../../model/product.model.js");

// [GET]/admin/product

module.exports.index = async (req, res) => {
  // result
  const result = require("../../helper/search.js").result(req);

  // filterStatus
  const filterStatus = require("../../helper/filter-status.js").filterStatus(
    req
  );
  // count
  const countTotalItems = await product.countDocuments(result);

  //pagination
  const pagination = require("../../helper/pagination.js").pagination(
    req,
    countTotalItems
  );

  const keyword = require("../../helper/search.js").keyword(req);

  const sort = require("../../helper/sort-item.js").sort(req);

  const listProduct = await product
    .find(result)
    .sort(sort)
    .limit(pagination.limitItems)
    .skip(pagination.skipItems);

  res.render("admin/page/product/index.pug", {
    pageTitle: "Trang sản phẩm",
    products: listProduct,
    filterStatus: filterStatus,
    pagination: pagination,
    keyword: keyword,
  });
};

// [PATCH]/admin/product/change-status/status/:id]
module.exports.changeStatus = async (req, res) => {
  try {
    await product.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          status: req.params.status,
        },
      }
    );
    req.flash("success",`Cập nhật trạng thái thành công`)
  } catch (error) {
    req.flash("error","Cập nhật trạng thái thất bại")
  } finally {
    res.redirect("back");
  }
};

// [PATCH]/admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  const typeChange = req.body.type;
  const ids = req.body.ids.split(", ");
  try {
    switch (typeChange) {
      case "active": {
        await product.updateMany({ id: { $in: ids } }, { status: "active" });
        req.flash("success",`Cập nhật trạng thái hoạt động cho ${ids.length} sản phẩm thành công`)
        break;
      }
      case "inactive": {
        await product.updateMany({ id: { $in: ids } }, { status: "inactive" });
        req.flash("success",`Cập nhật trạng thái dừng hoạt động cho ${ids.length} sản phẩm thành công`)
        break;
      }
      case "delete-all": {
        await product.updateMany({ id: { $in: ids } }, { delete: true });
        req.flash("success",`Xoá mềm ${ids.length} sản phẩm thành công`)
        break;
      }
    }
    
    res.redirect("back");
  } catch (error) {
    res.status(500).json({ message: "Cập nhật thất bại",error:error });
  }
};

// [PATCH]/admin/product/delete/:id
module.exports.deleteProduct = async (req, res) => {
  try {
    await product.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          deleted:true
        },
      }
    );
    req.flash("success","Xoá mềm sản phẩm thành công")
  } catch (error) {
    req.flash("error","Xoá mềm sản phẩm thất bại")
  } finally {
    res.redirect("back");
  }
};

// [GET]/admin/product/detail/:id
module.exports.detailProduct = async (req, res) => {
  const Product = await product.findOne({id:req.params.id});
  res.render("admin/page/product/detail.pug",{
    pageTitle:`Chi tiết ${Product.title}`,
    product : Product
  })
};

// [GET]/admin/product/edit/:id
module.exports.get_editProduct = async (req, res) => {
  const Product = await product.findOne({id:req.params.id});
  res.render("admin/page/product/edit.pug",{
    pageTitle:`Chỉnh sửa ${Product.title}`,
    Product:Product
  });
};

// [PATCH]/admin/product/edit/:id
module.exports.patch_editProduct = async (req, res) => {
  if(req.body.price) req.body.price=parseInt(req.body.price);
    else req.body.price=0;

  if(req.body.discountPercentage) req.body.discountPercentage=parseInt(req.body.discountPercentage);
    else req.body.discountPercentage=0;
  
  if(req.body.stock) req.body.rating=parseInt(req.body.rating);
    else req.body.rating=0;
  
  if(req.body.stock) req.body.stock=parseInt(req.body.stock);
    else req.body.stock=0;

  const countTotalItems = await product.countDocuments();
  if(req.body.position) {
    req.body.position=parseInt(req.body.position);
    if(req.body.position > countTotalItems) {
      req.body.position = countTotalItems + 1 ;
    } else {
      req.body.position = parseInt(req.body.position);
      await product.updateMany(
        { position:{$gte:req.body.position}}, 
        { $inc : {position:1}}
      )
    }
  };
  if(req.files.thumbnail) req.body.thumbnail = `/admin/upload/thumbnail/${req.files.thumbnail[0].filename}`
  if(req.files.images.length > 0 ) {
    req.body.images = [] ;
    req.files.images.forEach(image=>{
      req.body.images.push(`/admin/upload/images/${image.filename}`)
    })
  }
  try {
    await product.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: req.body
      }
    );
    req.flash("success","Cập nhật sản phẩm thành công");
    res.redirect("/admin/product");
  }
  catch(error) {
    req.flash("error","Cập nhật sản phẩm thất bại");
    res.redirect("back");
  }
};

// [GET]/admin/product/create
module.exports.get_createProduct = async(req,res) => {
  res.render("admin/page/product/create.pug",{
    pageTitle:"Tạo sản phẩm mới"
  });
}

// [POST]/admin/product/create
module.exports.post_createProduct = async(req,res) => {
  if(req.body.price) req.body.price=parseInt(req.body.price);
    else req.body.price=0;

  if(req.body.discountPercentage) req.body.discountPercentage=parseInt(req.body.discountPercentage);
    else req.body.discountPercentage=0;
  
  if(req.body.stock) req.body.rating=parseInt(req.body.rating);
    else req.body.rating=0;
  
  if(req.body.stock) req.body.stock=parseInt(req.body.stock);
    else req.body.stock=0;

  const countTotalItems = await product.countDocuments();
  if(req.body.position) {
    req.body.position=parseInt(req.body.position);
    if(req.body.position > countTotalItems) {
      req.body.position = countTotalItems + 1 ;
    } else {
      req.body.position = parseInt(req.body.position);
      await product.updateMany(
        { position:{$gte:req.body.position}}, 
        { $inc : {position:1}}
      )
    }
  };


  if(req.files.thumbnail) req.body.thumbnail = `/admin/upload/thumbnail/${req.files.thumbnail[0].filename}`
  if(req.files.images.length > 0 ) {
    req.body.images = [] ;
    req.files.images.forEach(image=>{
      req.body.images.push(`/admin/upload/images/${image.filename}`)
    })
  }
  
  const newProduct =await new product(req.body);
  newProduct.id=newProduct._id.toString();
  await newProduct.save();
  try {
    req.flash("success","Tạo sản phẩm thành công");
    res.redirect("/admin/product");
  } catch(error) {
    req.flash("error","Tạo sản phẩm thất bại");
    res.redirect("back");
  }
}