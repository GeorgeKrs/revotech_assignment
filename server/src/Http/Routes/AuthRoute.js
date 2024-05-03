import express from "express";
import AuthController from "../Controllers/AuthController.js";

const AuthRoute = express.Router();

AuthRoute.post("/auth/login", AuthController.login);
AuthRoute.post("/auth/logout", AuthController.logout);

export default AuthRoute;
