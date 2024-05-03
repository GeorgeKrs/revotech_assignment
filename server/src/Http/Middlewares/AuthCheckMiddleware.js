import ApiResponseDto from "../ApiHelpers/ApiResponseDto.js";

const AuthCheckMiddleware = (req, res, next) => {
  if (!req.params.sessionToken) {
    return res.status(401).json(ApiResponseDto.unauthorized());
  }

  return next();
};

export default AuthCheckMiddleware;
