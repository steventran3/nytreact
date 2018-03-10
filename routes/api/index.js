const router = require("express").Router();
const articleRoutes = require("./articles");
const NYT = require("./NYT");

// Article routes
router.use("/articles", articleRoutes);
router.use("/scrape", NYT);

module.exports = router;
