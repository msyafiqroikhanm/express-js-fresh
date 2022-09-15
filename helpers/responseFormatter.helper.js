class ResponseFormatter {
  static async InternalServerError(res) {
    res.status(500).json({ code: 500, status: "Internal Server Error" });
  }

  static async success(res, code, status, message, data) {
    return res.status(code).json({ code, status, message, data });
  }
}
module.exports = ResponseFormatter;
