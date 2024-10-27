const { Router } = require("express");
const db = require("../db/queries");

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  const result = await db.getMessages();
  res.render("index", { allMessages: result });
});

indexRouter.get("/new", (req, res, next) => {
  res.render("newMsg", { authenticationError: false });
});

indexRouter.post("/new", async (req, res, next) => {
  const { authOption, user, password, text } = req.body;
  const authenticated = await db.authenticate(user, password);

  if (!authenticated) {
    res.render("newMsg", { authenticationError: true });
    return;
  }

  await db.newMessage(text);
  res.redirect("/");
});

module.exports = indexRouter;
