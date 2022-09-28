`use strict`;
const { auth } = require("express-openid-connect");

let expressClient;

/** Sets up the express-openid-connect upon first request.  Normally this is done on app start but in
 * webtasks secrets are only available in requests so we have to wait for one to initiate client.
 */
const expressOIDCSDK = (useSession = true, authRequired = true, prompt) => {
  return (req, res, next) => {
    let secrets = req.
    webtaskContext.secrets;

    if (!expressClient) {
      expressClient = auth({
        session: useSession
          ? {
              ...(secrets.SESSION_ROLLING_DURATION && {
                rollingDuration: secrets.SESSION_ROLLING_DURATION,
              }),
            }
          : undefined,
        authRequired: authRequired,
        idpLogout: false,
        clientID: secrets.CLIENT_ID,
        clientSecret: secrets.CLIENT_SECRET,
        secret: secrets.SECRET,
        issuerBaseURL: secrets.ISSUER_BASE_URL,
        baseURL: secrets.BASE_URL,
        routes: {
          postLogoutRedirect: secrets.BASE_URL,
        },
        authorizationParams: {
          response_type: "code",
          audience: secrets.AUDIENCE,
          scope: secrets.SCOPE,
          prompt: prompt
        },
      });
    }
    expressClient(req, res, next);
  };
};

/** No effect in prod. If running locally mocks req.webtaskContext.secrets from .env file.
 */
function devSetup(req, res, next) {
  if (!req.webtaskContext) {
    let dotenv = require("dotenv").config();

    req.webtaskContext = {
      secrets: dotenv.parsed,
    };
  }
  next();
}

module.exports = { expressOIDCSDK, devSetup };
