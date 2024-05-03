import ApiResponseDto from "../ApiHelpers/ApiResponseDto.js";

const AuthCheckMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const sessionToken = authHeader && authHeader.split(" ")[1];

  if (!sessionToken) {
    return res.status(401).json(ApiResponseDto.unauthorized());
  }

  try {
    const sessionCollection = Parse.Object.extend("_Session");
    const session = await new Parse.Query(sessionCollection)
      .equalTo("sessionToken", sessionToken)
      .first({ useMasterKey: true });

    if (!session) {
      return res.status(401).json(ApiResponseDto.unauthorized());
    }

    req.sessionToken = sessionToken;
    req.user = session.get("user");

    return next();
  } catch (error) {
    console.error("Failed to validate session token: ", error);

    return res.status(500).json(
      ApiResponseDto.serverError({
        message: "Failed to validate session token",
      })
    );
  }
};

export default AuthCheckMiddleware;
