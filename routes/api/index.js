const router = require("express").Router();
const auth = require("./auth");
const trade = require("./trade");

// routes
router.use("/auth", auth);
router.use("/trades", trade);

module.exports = router;
