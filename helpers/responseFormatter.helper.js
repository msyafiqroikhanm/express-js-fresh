class ResponseFormatter {
  static async InternalServerError(res) {
    res.status(500).json({ code: 500, status: "Internal Server Error" });
  }

  static async success(res, code, status, message, data) {
    return res.status(code).json({ code, status, message, data });
  }

  static async success200(res, message, data) {
    const code = 200;
    const status = "OK";
    return res.status(code).json({ code, status, message, data });
  }

  static async success201(res, message, data) {
    const code = 201;
    const status = "Created";
    return res.status(code).json({ code, status, message, data });
  }

  static async error400(res, message, data) {
    const code = 400;
    const status = "Bad Request";
    return res.status(code).json({ code, status, message, data });
  }

  static async error401(res, message, data) {
    const code = 401;
    const status = "Unauthorized";
    return res.status(code).json({ code, status, message, data });
  }

  static async error404(res, message, data) {
    const code = 404;
    const status = "Not Found";
    return res.status(code).json({ code, status, message, data });
  }

  static async error406(res, message, data) {
    const code = 406;
    const status = "Not Acceptable";
    return res.status(code).json({ code, status, message, data });
  }

  static async error409(res, message, data) {
    const code = 409;
    const status = "Conflict";
    return res.status(code).json({ code, status, message, data });
  }
}
module.exports = ResponseFormatter;
