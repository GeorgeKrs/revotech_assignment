import ApiResponseDto from "../ApiHelpers/ApiResponseDto.js";

class AuthController {
  static login = async (req, res) => {
    try {
      //TODO: Login logic
      return res.status(200).json(ApiResponseDto.success());
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json(ApiResponseDto.serverError({ message: "Failed to login" }));
    }
  };

  static logout = async (req, res) => {
    try {
      //TODO: Logout logic

      return res.status(200).json(ApiResponseDto.success());
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json(ApiResponseDto.serverError({ message: "Failed to logout" }));
    }
  };
}

export default AuthController;
