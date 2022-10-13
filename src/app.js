require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
var cors = require('cors')

// server port
const port = process.env.PORT;

// Now app is the express server.
const app = express();

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING)
  .then(() => console.log("Connected to MONGO DB successfully"))
  .catch(() => console.log("Error connecting to MONGO DB"));

  app.use(cors())

// Parsing JSON to req.body
app.use(bodyParser.json());

//Express Middlewares:
// A function that runs in the middle of our request.
// A function that runs after the server recieves a request and before the express server sends a response.

// userRoutes
app.use(userRouter);

// // what port you want the app to "listen" to, second arg is callback function to run
app.listen(port, () =>
  console.log("Music store server is listening for request")
);


app.use(error)




// // Error middleware
//   // 1st arg => error
// const errorHandler = (error, req, res, next) => {
  
//   if (res.headersSent) {
//     return next(err)
//   }

//     // if(error.message === "cant connect to database"){
//     //   // send and email to seniorDevs on team
//     //   // wake developers to fix issue
//     //   console.log('Error: ', error)
//     // }

//   res.status(500).send('Colossal Error')
// }

// app.use(errorHandler)