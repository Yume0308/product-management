const router = require("express").Router();

const categoryController = require("../../controller/admin/category.controller.js");

router.get("/",categoryController.index);

module.exports = router;