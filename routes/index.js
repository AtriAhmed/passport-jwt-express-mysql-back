const router = require("express").Router();

const usersRoute = require("./users");
const loginRoute = require("./login");
const logoutRoute = require("./logout");
const { default: validate } = require("deep-email-validator");
const authenticateJwt = require("../authenticateJwt");

// router.use(authenticateJwt);

// login route for Users
router.use("/login", loginRoute);

// // logout route for Users
router.use("/logout", logoutRoute);

router.use("/users", usersRoute);

const registrationToken =
  "c3dgO9e2TIWBqsH5xFNiXL:APA91bFpOoygxwNKGGy39SpavS2vvYEQnQ5rh4-IrgKbmfeYa1QyOtBovkfsHTpt4Li_WS4XrO4kQPfi3RDUC2l6zrQrmuoMHHxeo-H91NcAwBXau7sSW0MfCOuZchjunOrrqoBC75dA";
const axios = require("axios");

router.all("/success", (req, res) => {
  res.send("success");
});

// =========== SEND REACT PRODUCTION BUILD ====================
router.get("*", (req, res) => {
  res.status(404).send("Route not found");
});

module.exports = router;
