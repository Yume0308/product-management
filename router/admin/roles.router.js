const router = require("express").Router();
const rolesController = require("../../controller/admin/roles.controller.js");

router.get("/",rolesController.index);

module.exports = router;