const db = require("../models");
const auth = require("../middleware/auth");

module.exports = {
  getTrades: [
    auth,
    function (req, res) {
      res.json({ msg: "hit get all trades route" });
    },
  ],
  addTrade: [
    auth,
    function (req, res) {
      res.json({ msg: "hit add trade route" });
    },
  ],
};
