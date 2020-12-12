const express = require("express");
const PORT = process.env.PORT || 5000;
const routes = require("./routes");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

app.get("*", (req, res) => {
  res.sendFile("./client/build/index.html", { root: __dirname });
});

console.log(process.env.key);

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("Database Connected"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
