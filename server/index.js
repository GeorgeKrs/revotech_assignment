import { ParseServer } from "parse-server";
import express from "express";
import http from "http";
import path from "path";
import cors from "cors";
import "dotenv/config";

const __dirname = path.resolve();

export const app = express();

app.options("*", cors());

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

app.get("/", function (req, res) {
  res
    .status(200)
    .send(
      "I dream of being a website.  Please star the parse-server repo on GitHub!"
    );
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
// app.get("/test", function (req, res) {
//   res.sendFile(path.join(__dirname, "/public/test.html"));
// });

if (!process.env.TESTING) {
  const port = process.env.SERVER_PORT || 1337;
  const httpServer = http.createServer(app);

  httpServer.listen(port, function () {
    console.log(`Server is running on port ${port}.`);
  });
}
