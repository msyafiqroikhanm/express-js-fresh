const { verifyJwt } = require("../services/jwt.service");
const { getDataUser } = require("../services/user.service");

class AuthMiddleware {
  static async authenticate(req, res, next) {
    try {
      if (!req.headers.authorization) {
        throw {
          code: 406,
          status: "Not Acceptable",
          message: "Anda tidak memiliki access_token",
        };
      }

      const payload = await verifyJwt(req.headers.authorization);
      if (!payload) {
        throw {
          code: 401,
          status: "Unauthorized Request",
          message: "Token tidak sah",
        };
      }

      const user = await getDataUser({ id: payload.id });
      if (!user.access_token) {
        throw {
          code: 401,
          status: "Unauthorized Request",
          message: "Silahkan login terlebih dahulu",
        };
      }

      if (user.access_token !== req.headers.authorization) {
        throw {
          code: 401,
          status: "Unauthorized Request",
          message: "Token tidak sesuai, silahkan login kembali",
        };
      }

      req.user = payload;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async authorization(req, res, next, allowedRoles) {
    try {
      let authorized;
      for (let i = 0; i < allowedRoles.length; i++) {
        if (req.user.roleId == allowedRoles[i]) {
          authorized = true;
        }
      }

      if (!authorized) {
        throw {
          code: 401,
          status: "Unauthorized Request",
          message: "Anda tidak memiliki akses ke layanan ini",
        };
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  static async xAppKey(req, res, next) {
    try {
      if (!req.headers) {
        throw {
          code: 401,
          status: "Unauthorized Request",
          message: "Anda tidak memiliki akses ke layanan ini",
        };
      }
      if (!req.headers["x-app-key"]) {
        throw {
          code: 401,
          status: "Unauthorized Request",
          message: "Anda tidak memiliki akses ke layanan ini",
        };
      }
      if (req.headers["x-app-key"] !== "PTJAKTOURJXBPTJAKTOURJXBPTJAKTOURJXB") {
        throw {
          code: 401,
          status: "Unauthorized Request",
          message: "Anda tidak memiliki akses ke layanan ini",
        };
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthMiddleware;
