import ApiResponseDto from "../ApiHelpers/ApiResponseDto.js";

class AuthController {
  static login = async (req, res) => {
    try {
      const user = await Parse.User.logIn(req.body.username, req.body.password);

      return res.status(200).json(
        ApiResponseDto.success({
          data: {
            username: user.getUsername(),
            token: user.getSessionToken(),
          },
        })
      );
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json(ApiResponseDto.serverError({ message: "Failed to login" }));
    }
  };

  static logout = async (req, res) => {
    try {
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
