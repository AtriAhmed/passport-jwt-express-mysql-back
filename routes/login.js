const router = require("express").Router();
const authenticateJwt = require("../authenticateJwt");
const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.use(authenticateJwt);

router.post("/", async function (req, res) {
  const { email, password } = req.body;

  try {
    const result = await User.findOne({
      where: {
        email,
      },
    });
    const user = await result?.toJSON();

    console.log("from login", user);

    if (!user) {
      res.status(400).send("user not found");
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    console.log("-------------------- match --------------------");
    console.log(match);
    if (match) {
      if (!user.active) {
        res.status(400).send("suspended");
        return;
      }
      delete user.password;

      const token = jwt.sign({ sub: user.id }, process.env.MY_SECRET, { expiresIn: "30d" });

      user.token = token;

      console.log("success from login", user);

      res.send(user);
      return;
    } else {
      res.status(400).send("incorrect password");
      return;
    }
  } catch (err) {
    console.log("-------------------- err --------------------");
    console.log(err);
    res.status(400).send(err);
    return;
  }
});

// '/api/login/status' route
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    if (!req.user.active) {
      req.logOut();
      return res.send({ user: null });
    }

    return res.status(200).json({ user: req.user });
  }

  res.status(200).json({
    user: null,
  });
});

module.exports = router;
