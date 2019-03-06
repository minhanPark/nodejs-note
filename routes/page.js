const express = require("express");
const { isNotLoggedIn } = require("./middlewares");
const { Note, User } = require("../models");
const router = express.Router();

router.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("signup", {
    title: "회원가입",
    user: req.user,
    signupError: req.flash("signupError")
  });
});

router.get("/", (req, res, next) => {
  const id = req.user ? req.user.id : null;
  Note.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "nick"],
        where: { id }
      }
    ],
    limit: 7,
    order: [["createdAt", "DESC"]]
  })
    .then(notes => {
      console.log(notes);
      res.render("main", {
        title: "NodeNote",
        notes: notes,
        user: req.user,
        loginError: req.flash("loginError")
      });
    })
    .catch(err => {
      console.error(error);
      next(error);
    });
});

module.exports = router;
