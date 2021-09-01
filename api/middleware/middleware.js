const { getById } = require("../users/users-model");

function logger(req, res, next) {
  console.log("METHOD: ", req.method, "URL: ", req.url, "TIME: ", Date.now());
  next();
}

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const user = await getById(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      next({
        status: 404,
        message: "User with this ID not found",
      });
    }
  } catch (err) {
    next;
  }
};

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
};
