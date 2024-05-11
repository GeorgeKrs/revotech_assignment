import { ParseServer } from "parse-server";
import express from "express";
import http from "http";
import path from "path";
import cors from "cors";
import "dotenv/config";
import IslandRoute from "./src/Http/Routes/IslandRoute.js";
import AuthRoute from "./src/Http/Routes/AuthRoute.js";

const __dirname = path.resolve();

export const config = {
  databaseURI: process.env.DB_URI,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL,
  //TODO: Troubleshoot the parameter below
  // fileUpload: {
  //   enableForPublic: false,
  //   enableForAnonymousUser: false,
  //   enableForAuthenticatedUser: true,
  // },
  fileUpload: {
    enableForPublic: true,
  },
};

export const app = express();
app.set("trust proxy", true);

app.use("/public", express.static(path.join(__dirname, "/public")));

// Serve the Parse API on the /parse URL prefix
if (!process.env.TESTING) {
  const mountPath = process.env.PAIslandsRSE_MOUNT || "/parse";
  const server = new ParseServer(config);
  await server.start();
  app.use(mountPath, server.app);
}

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    methods: "*",
    allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
  })
);
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", AuthRoute);
app.use("/api", IslandRoute);

if (!process.env.TESTING) {
  const port = process.env.SERVER_PORT || 1337;
  const httpServer = http.createServer(app);

  httpServer.listen(port, function () {
    console.log(`Server is running on port ${port}.`);
  });
}
