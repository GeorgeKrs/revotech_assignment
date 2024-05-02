import { ParseServer } from "parse-server";
import express from "express";
import http from "http";
import path from "path";
import cors from "cors";
import "dotenv/config";
import Islands from "./Models/Islands.js";

const __dirname = path.resolve();

export const config = {
  databaseURI: process.env.DB_URI,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL,
};

export const app = express();

app.use("/public", express.static(path.join(__dirname, "/public")));

// Serve the Parse API on the /parse URL prefix
if (!process.env.TESTING) {
  const mountPath = process.env.PARSE_MOUNT || "/parse";
  const server = new ParseServer(config);
  await server.start();
  app.use(mountPath, server.app);
}

app.set("trust proxy", true);

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
  })
);
app.options("*", cors());

app.get("/api/islands", async (req, res) => {
  try {
    const islands = await Islands.find(req.query);

    res.json({
      status: 200,
      data: islands,
      message: null,
    });
  } catch (error) {
    console.log(error);

    res.json({
      status: 500,
      data: [],
      message: "Failed to fetch islands",
    });
  }
});

app.get("/api/islands/:id", async (req, res) => {
  try {
    const islandId = req.params.id;

    const island = await Islands.get(islandId);

    return res.json({
      status: 200,
      data: island,
      message: null,
    });
  } catch (error) {
    if (error?.code === 101) {
      return res.json({
        status: 404,
        data: [],
        message: "Island not found",
      });
    }

    console.log(error);
    res.json({
      status: 500,
      data: [],
      message: "Failed to fetch island",
    });
  }
});

if (!process.env.TESTING) {
  const port = process.env.SERVER_PORT || 1337;
  const httpServer = http.createServer(app);

  httpServer.listen(port, function () {
    console.log(`Server is running on port ${port}.`);
  });
}
