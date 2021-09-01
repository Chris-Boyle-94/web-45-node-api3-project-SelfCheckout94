const express = require("express");

const { logger, validateUserId } = require("../middleware/middleware");

const Users = require("./users-model");
const Posts = require("./../posts/posts-model");

const router = express.Router();

router.get("/", logger, async (req, res, next) => {
  try {
    const users = await Users.get(req.query);
    res.status(200).json(users);
  } catch (err) {
    next();
  }
});

router.get("/:id", logger, validateUserId, async (req, res) => {
  res.json(req.user);
});

router.post("/", (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id", (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

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
