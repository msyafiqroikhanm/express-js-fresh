const { google } = require("googleapis");

const {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  SERVER_ROOT_URL,
  SERVER_LOGIN_ENDPOINT,
} = process.env;

const oauth2Client = new google.auth.OAuth2(
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  `${SERVER_ROOT_URL}` // Redirect URL to frontend
);

module.exports = {
  generateAuthUrl: () => {
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      response_type: "code",
      scope: scopes,
    });

    return url;
  },

  setCredentials: async (code) => {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      return tokens;
    } catch (err) {
      return err;
    }
  },

  getUserInfo: () =>
    // eslint-disable-next-line consistent-return
    new Promise((resolve, reject) => {
      try {
        const oauth2 = google.oauth2({
          auth: oauth2Client,
          version: "v2",
        });

        oauth2.userinfo.get((err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(res);
        });
      } catch (err) {
        // eslint-disable-next-line no-promise-executor-return
        return reject(err);
      }
    }),
};
