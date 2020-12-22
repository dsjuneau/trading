const { check, validationResult } = require("express-validator/check");

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
      res.json({ msg: "create user route hit" });
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
