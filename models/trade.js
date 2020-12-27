const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  account: { type: String, unique: true },
  trades: { type: Object },
});

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;
