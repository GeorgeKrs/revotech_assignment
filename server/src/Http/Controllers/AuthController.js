import Session from "../../Models/Session.js";
import ApiResponseDto from "../ApiHelpers/ApiResponseDto.js";

class AuthController {
  static login = async (req, res) => {
    try {
      if (req.sessionToken) {
        await new Session(req.sessionToken).delete();
      }

      const user = await Parse.User.logIn(req.body.username, req.body.password);

      return res.status(200).json(
        ApiResponseDto.success({
          data: {
            username: user.getUsername(),
            sessionToken: user.getSessionToken(),
          },
        })
      );
    } catch (error) {
      if (error?.code === 101) {
        return res.status(401).json(
          ApiResponseDto.unauthorized({
            message: "Invalid username/password.",
          })
        );
      }

      console.log(error);

      return res
        .status(500)
        .json(ApiResponseDto.serverError({ message: "Failed to login" }));
    }
  };

  static logout = async (req, res) => {
    try {
      if (req.sessionToken) {
        await new Session(req.sessionToken).delete();
      }

      req.sessionToken = null;
      await Parse.User.logOut();

      return res
        .status(200)
        .json(ApiResponseDto.success({ message: "Logout successfully!" }));
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json(ApiResponseDto.serverError({ message: "Failed to logout" }));
    }
  };
}

export default AuthController;
