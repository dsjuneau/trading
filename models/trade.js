const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  category: { type: String, required: true },
  tradeId: { type: String, required: true },
  trade: { type: Array },
});

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;
