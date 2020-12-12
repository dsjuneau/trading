module.exports = {
  createUser: function (req, res) {
    res.json({ msg: "create user route hit" });
  },

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
