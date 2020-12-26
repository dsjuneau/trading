const router = require("express").Router();
const tradesController = require("../../controllers/tradeController");

router.route("/").get(tradesController.getTrades);
router.route("/").post(tradesController.addTrade);

module.exports = router;
