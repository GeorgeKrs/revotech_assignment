import express from "express";
import AuthController from "../Controllers/AuthController.js";
import AuthCheckMiddleware from "../Middlewares/AuthCheckMiddleware.js";

const AuthRoute = express.Router();

AuthRoute.post("/auth/login", AuthCheckMiddleware, AuthController.login);
AuthRoute.post("/auth/logout", AuthCheckMiddleware, AuthController.logout);

export default AuthRoute;
