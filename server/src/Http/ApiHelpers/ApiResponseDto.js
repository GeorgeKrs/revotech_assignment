class ApiResponseDto {
  static success = ({ status = 200, data = null, message = null }) => {
    return {
      status,
      data,
      message,
    };
  };

  static unauthorized = (
    status = 401,
    data = null,
    message = "Unauthorized."
  ) => {
    return {
      status,
      data,
      message,
    };
  };

  static forbidden = ({
    status = 403,
    data = null,
    message = "Forbidden.",
  }) => {
    return {
      status,
      data,
      message,
    };
  };

  static notFound = ({
    status = 404,
    data = null,
    message = "Resource not found.",
  }) => {
    return {
      status,
      data,
      message,
    };
  };

  static serverError = ({
    status = 500,
    data = null,
    message = "Something went wrong, please try again later.",
  }) => {
    return {
      status,
      data,
      message,
    };
  };
}

export default ApiResponseDto;
