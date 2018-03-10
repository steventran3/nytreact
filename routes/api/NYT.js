const router = require("express").Router();
const NYTController = require("../../controllers/NYT");

//NYT
router.route("/NYT")
  .get(NYTController.getNYTData)
module.exports = router;
