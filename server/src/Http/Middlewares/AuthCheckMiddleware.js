import Session from "../../Models/Session.js";
import ApiResponseDto from "../ApiHelpers/ApiResponseDto.js";

const AuthCheckMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const sessionToken = authHeader && authHeader.split(" ")[1];

    if (!sessionToken) {
      return next();
    }

    const session = await new Session(sessionToken).get();

    if (!session) {
      return next();
    }

    req.sessionToken = sessionToken;

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
