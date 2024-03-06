const router = require("express").Router();
const dashboardController = require("../../controller/admin/dashboard.controller.js");

router.get("", dashboardController);
module.exports = router;
