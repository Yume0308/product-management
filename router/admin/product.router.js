const router = require("express").Router();

const productController = require("../../controller/admin/product.controller.js");

//multer
const storageMulter=require("../../midderware/admin/storageMulter.js");
const multer = require("multer");
const upload = multer({
    // storage:storageMulter(),
    // limits:{
    //     fileSize:"2mb"
    // }
})

//cloudinary
const cloudinary =require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:true 
});

const adminValidate = require("../../validate/admin/createProduct.validate.js");

// [GET]/admin/product
router.get("/", productController.index);

// [PATCH]/admin/product/change-status/:status/:id
router.patch("/change-status/:status/:id",productController.changeStatus);

// [PATCH]/admin/product/change-multi
router.patch("/change-multi",productController.changeMulti);

//[GET]/admin/product/detail/:id
router.get("/detail/:id",productController.detailProduct);

//[GET]/admin/product/edit/:id
router.get("/edit/:id",productController.get_editProduct);

//[PATCH]/admin/product/edit/:id
router.patch("/edit/:id",productController.patch_editProduct);

// [PATCH]/admin/product/delete/:id
router.patch("/delete/:id",productController.deleteProduct);

// [GET]/admin/product/create
router.get("/create",productController.get_createProduct);

// [POST]/admin/product/create
router.post("/create",
            upload.fields(
                [
                    {
                        name:"thumbnail",
                        maxCount:1
                    },
                    {
                        name:"images",
                        maxCount:8
                    }
                ]
            ),
            adminValidate.titleProduct,
            productController.post_createProduct
)
module.exports = router;
