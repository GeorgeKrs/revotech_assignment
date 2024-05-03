import Island from "../../Models/Island.js";
import ApiResponseDto from "../ApiHelpers/ApiResponseDto.js";

class IslandController {
  static index = async (req, res) => {
    try {
      const islands = await Island.find(req.query);

      return res.status(200).json(ApiResponseDto.success({ data: islands }));
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json(
          ApiResponseDto.serverError({ message: "Failed to fetch islands" })
        );
    }
  };

  static show = async (req, res) => {
    try {
      const island = await Island.get(req.params.id);

      return res.status(200).json(ApiResponseDto.success({ data: island }));
    } catch (error) {
      if (error?.code === 101) {
        return res
          .status(404)
          .json(ApiResponseDto.notFound({ message: "Island not found" }));
      }

      console.log(error);

      return res
        .status(500)
        .json(
          ApiResponseDto.serverError({ message: "Failed to fetch island" })
        );
    }
  };

  static update = async (req, res) => {
    try {
      let island = await Island.get(req.params.id);

      if (!island) {
        return res.status(404).json(ApiResponseDto.notFound());
      }

      island = await new Island(island).update(req.body, req.sessionToken);

      return res.status(200).json(ApiResponseDto.success({ data: island }));
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json(
          ApiResponseDto.serverError({ message: "Failed to update island" })
        );
    }
  };
}

export default IslandController;
