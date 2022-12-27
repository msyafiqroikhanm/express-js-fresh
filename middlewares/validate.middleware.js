const { validationResult } = require("express-validator");

class ValidateMiddleware {
  static async result(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next({
          code: 400,
          status: "Bad Request",
          message: errors.errors,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ValidateMiddleware;
