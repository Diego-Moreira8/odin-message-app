const { Router } = require("express");
const db = require("../db/queries");

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  const result = await db.getMessages();
  res.render("index", { allMessages: result });
});

indexRouter.get("/new", (req, res, next) => res.render("newMsg"));

indexRouter.post("/new", async (req, res, next) => {
  await db.newMessage(req.body.text);
  res.redirect("/");
});

module.exports = indexRouter;
