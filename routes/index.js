const { Router } = require("express");

const indexRouter = Router();
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res, next) => res.render("index", { messages }));

indexRouter.get("/new", (req, res, next) => res.render("newMsg"));

indexRouter.post("/new", (req, res, next) => {
  messages.push({ ...req.body, added: new Date() });
  res.redirect("/");
});

module.exports = indexRouter;
