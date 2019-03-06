const express = require("express");
const { isLoggedIn } = require("./middlewares");
const { Note } = require("../models");
const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    await Note.create({
      content: req.body.content,
      userId: req.user.id
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
