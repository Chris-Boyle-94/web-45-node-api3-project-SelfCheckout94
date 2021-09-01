const express = require("express");

const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
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

router.get("/:id", logger, validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", logger, validateUser, async (req, res, next) => {
  try {
    const newUser = await Users.insert(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next();
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
      next();
    }
  }
);

router.delete("/:id", logger, validateUserId, async (req, res, next) => {
  try {
    await Users.remove(req.params.id);
    res.status(200).json(req.user);
  } catch (error) {
    next;
  }
});

router.get("/:id/posts", logger, validateUserId, async (req, res, next) => {
  try {
    const posts = await Posts.get();
    const userPosts = posts.filter((post) => {
      return post.user_id === req.user.id;
    });
    res.status(200).json(userPosts);
  } catch (err) {
    next;
  }
});

router.post(
  "/:id/posts",
  logger,
  validateUserId,
  validatePost,
  async (req, res, next) => {
    try {
      const postInfo = {
        ...req.body,
        user_id: req.user.id,
      };
      const newPost = await Posts.insert(postInfo);
      res.status(200).json(newPost);
    } catch (err) {
      next;
    }
  }
);

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "Something went wrong in the user router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
