const express = require("express");

const userRouter = express.Router();

// Route to create user accounts
userRouter.post("/register-user", (req, res, next) => {
  // console.log("Route is working");
  //   console.log('req: ', req)
  console.log("req.body: ", req.body);

  res.send("Route hit successfully");
});

module.exports = userRouter;
