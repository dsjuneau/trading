const { check, validationResult } = require("express-validator");
const db = require("../models");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser: [
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
    ],
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;
      db.User.findOne({ email })
        .then((dbReturn) => {
          if (dbReturn) {
            res.status(400).json({ msg: "User already exists" });
          } else {
            let user = new db.User({ name, email, password });
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(password, salt);
            user
              .save()
              .then((dbR) => res.json(dbR))
              .catch((err) => res.status(422).json(err));
          }
        })
        .catch((err) => res.status(500).json({ msg: "Server Error" }));
    },
  ],

  authUser: function (req, res) {
    res.json({ msg: "auth user route hit" });
  },
  isAuthUser: function (req, res) {
    res.json({ msg: "isAuth user route hit" });
  },
  reset: function (req, res) {
    res.json({ msg: "reset route hit" });
  },
};
