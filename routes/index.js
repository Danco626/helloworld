const router = require("express").Router();
const view = require("../views/index");
const ejs = require("ejs")

router.use("/", async (req, res, next) => {
  const user = req.oidc.user;

  res.end(ejs.render(view, { title: 'Hello World', user}));
});


module.exports = router;
