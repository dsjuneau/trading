const { check, validationResult } = require("express-validator");
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth");

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
              .then((dbR) => {
                const payload = {
                  user: {
                    id: user.id,
                  },
                };
                jwt.sign(
                  payload,
                  process.env.JWT_SECRET,
                  {
                    expiresIn: 360000,
                  },
                  (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                  }
                );
              })
              .catch((err) => res.status(422).json(err));
          }
        })
        .catch((err) => res.status(500).json({ msg: "Server Error" }));
    },
  ],

  authUser: function (req, res) {
    const { email, password } = req.body;
    db.User.findOne({ email })
      .then((dbR) => {
        if (!dbR) {
          return res.status(400).json({ msg: "Invalid Credentials" });
        }
        if (bcrypt.compareSync(password, dbR.password)) {
          const payload = {
            user: {
              id: dbR.id,
            },
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
              expiresIn: 360000,
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        } else {
          res.status(400).json({ msg: "Invalid Credentials" });
        }
      })
      .catch((err) => res.status(500).json({ msg: "Server Error" }));
  },
  isAuthUser: [
    auth,
    function (req, res) {
      db.User.findById(req.user.id)
        .select("-password")
        .then((dbR) => {
          if (dbR) {
            res.json(dbR);
          } else {
            res.status(401).json({ msg: "Could not find user" });
          }
        })
        .catch((err) => res.status(500).json({ msg: "Server Error" }));
    },
  ],
  reset: function (req, res) {
    res.json({ msg: "reset route hit" });
  },
};
