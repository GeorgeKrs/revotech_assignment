import express from "express";
import AuthController from "../Controllers/AuthController.js";

const AuthRoute = express.Router();

AuthRoute.post("/login", AuthController.login);
AuthRoute.post("/logout", AuthController.logout);

export default AuthRoute;
