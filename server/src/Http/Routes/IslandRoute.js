import express from "express";
import IslandController from "../Controllers/IslandController.js";
import AuthCheckMiddleware from "../Middlewares/AuthCheckMiddleware.js";

const IslandRoute = express.Router();

IslandRoute.get("/islands", IslandController.index);
IslandRoute.get("/islands/:id", IslandController.show);
IslandRoute.put(
  "/islands/:id/update",
  AuthCheckMiddleware,
  IslandController.update
);

export default IslandRoute;
