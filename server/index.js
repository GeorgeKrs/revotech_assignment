import { ParseServer } from "parse-server";
import express from "express";
import http from "http";
import path from "path";
import cors from "cors";
import "dotenv/config";
import Islands from "./Models/Islands.js";

const __dirname = path.resolve();

export const app = express();

const corsOptions = {
  origin: "http://localhost",
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.set("trust proxy", true);

app.use("/public", express.static(path.join(__dirname, "/public")));

// Serve the Parse API on the /parse URL prefix
if (!process.env.TESTING) {
  const mountPath = process.env.PARSE_MOUNT || "/parse";

  const server = new ParseServer({
    databaseURI: process.env.DB_URI,
    appId: process.env.APP_ID,
    masterKey: process.env.MASTER_KEY,
    serverURL: process.env.SERVER_URL,
  });

  await server.start();
  app.use(mountPath, server.app);
}

app.get("/api/islands", async (req, res) => {
  try {
    const islands = await Islands.find();

    res.status(200).json(islands);
  } catch (error) {
    res.status(500).send("Failed to fetch islands");
  }
});

app.get("/api/islands/:id", async (req, res) => {
  try {
    const islandId = req.params.id;

    const island = await Islands.get(islandId);

    return res.status(200).json(island);
  } catch (error) {
    if (error?.code === 101) {
      return res.status(404).send("Island not found");
    }

    return res.status(500).send("Failed to fetch island");
  }
});

if (!process.env.TESTING) {
  const port = process.env.SERVER_PORT || 1337;
  const httpServer = http.createServer(app);

  httpServer.listen(port, function () {
    console.log(`Server is running on port ${port}.`);
  });
}
