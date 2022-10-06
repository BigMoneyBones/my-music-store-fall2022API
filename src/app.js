require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const port = process.env.PORT;

// Now app is the express server.
const app = express();

// parsing JSON to req.body
app.use(bodyParser.json());

//Express Middlewares:
// A function that runs in the middle of our request.
// That a function that runs after the server recieves a request and before the express server sends a response.
// console.log("hey");

// userRoutes

app.listen(port, () =>
  console.log("Music store server is listening for request")
);

// Auth User

// app.use((req, res, next) => {
//   console.log("Pretend user is being verified");

//   next();
// });

// app.get("/home", (req, res, next) => {
//   res.send("Home Page");
//   next();
// });

// app.post("/user", (req, res, next) => {
//   res.send("responding to user route");
// });

// // what port you want the app to "listen" to, second arg is callback function to run
// app.listen(3010, () =>
//   console.log("Music store server is listening for request")
// );
