const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

const cleanUser = (userDocument) => {
  return {
    id: userDocument._id,
    firstName: userDocument.firstName,
    lastName: userDocument.lastName,
    email: userDocument.email,
    profilePicture: userDocument.profilePicture,
    isAdmin: userDocument.isAdmin,
  };
};

const userRouter = express.Router();

// Finish user registration

// Route to create user accounts
userRouter.post("/register-user", async (req, res, next) => {
  // 1. we dont have a way to unigiuely identify users by email, username, or phone
  // create a new key in the user model 'unique' and set it to 'true' this makes sure the email cannot be used to make multiple accounts.
  // 2. we are storing the user's password in our database
  // ^^THIS IS A BIG NO-NO. what if the same password is used for other sites?
  // get credentials and user info from the front end
  // HASH (Bcrypt) the password
  // save the user information in the database

  // console.log("req.body: ", req.body);

  // Get credentials and user info from the front end.
  const { firstName, lastName, email, password, profilePicture } = req.body;

  // HASH (Bcrypt) the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // console.log("hashedPassword: ", hashedPassword);

  try {
    // store a password HASH, not the password
    const userDocument = new UserModel({
      firstName,
      lastName,
      email,
      hashedPassword,
      profilePicture,
    });

    await userDocument.save();

    res.send({ user: cleanUser(userDocument) });
  } catch (error) {
    next(error);
  }

  // res.send("Route hit successfully");
});

userRouter.post("/sign-in", async (req, res, next) => {
  // Get the credentials from request
  const { email, password } = req.body.credentials;

  try {
    // Check if that particular user exists in the database
    const foundUser = await UserModel.findOne({ email: email });
    console.log("found user: ", foundUser);

    // If the user does exist in the DB, verify the password matches
    if (!foundUser) {
      return res.status(401).send("User not found or incorrect credentials!");
    }
    // Verify the password matches
    const passwordMatch = await bcrypt.compare(
      password,
      foundUser.hashedPassword
    );

    if (!passwordMatch) {
      // if password doesnt match, tell the user
      return res.status(401).send("User not found or incorrect credentials!");
    }

    // The user can be successfully authenticated
    // Send user data back to client
    res.send({ user: cleanUser(foundUser) });
  } catch (error) {
    next();
  }
  // Provide a way for the user to not have to enter their password again in future requests.
});

module.exports = userRouter;
