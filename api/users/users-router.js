const express = require("express");

const {
  logger,
  validateUserId,
  validateUser,
} = require("../middleware/middleware");

const Users = require("./users-model");
const Posts = require("./../posts/posts-model");

const router = express.Router();

router.get("/", logger, async (req, res, next) => {
  try {
    const users = await Users.get(req.query);
    res.status(200).json(users);
  } catch (err) {
    next;
  }
});

router.get("/:id", logger, validateUserId, async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next;
  }
});

router.post("/", logger, validateUser, async (req, res, next) => {
  try {
    const newUser = await Users.insert(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next;
  }
});

router.put(
  "/:id",
  logger,
  validateUserId,
  validateUser,
  async (req, res, next) => {
    try {
      const updatedUser = await Users.update(req.params.id, req.body);
      res.status(200).json(updatedUser);
    } catch (err) {
      next;
    }
  }
);

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "Something went wrong in the user router",
    message: err.message,
    stack: err.stack,
  });
});

// do not forget to export the router
module.exports = router;
