const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const app = express();

app.post("/login", (req, res) => {
  let body = req.body;

  User.findOne({ email: body.email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (userDB == null) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Invalid (user) or password",
        },
      });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Invalid user or (password)",
        },
      });
    }

    res.json({
      ok: true,
      user: userDB,
    });
  });
});

module.exports = app;
