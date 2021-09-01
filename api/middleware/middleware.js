const { getById } = require("../users/users-model");

const logger = (req, res, next) => {
  console.log(
    "METHOD: ",
    req.method,
    "||",
    "URL: ",
    req.url,
    "||",
    "TIME: ",
    Date.now()
  );
  next();
};

const validateUserId = async (req, res, next) => {
  try {
    const user = await getById(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      next({
        status: 404,
        message: "user not found",
      });
    }
  } catch (err) {
    next;
  }
};

const validateUser = (req, res, next) => {
  const { name } = req.body;
  if (name) {
    next();
  } else {
    next({
      status: 400,
      message: "missing required name field",
    });
  }
};

const validatePost = (req, res, next) => {
  const { text } = req.body;
  if (text) {
    next();
  } else {
    next({
      status: 400,
      message: "missing required text field",
    });
  }
};

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
