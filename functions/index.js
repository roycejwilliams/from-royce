const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const next = require("next");
const postsRouter = require("./src/routes/posts");

const dev = process.env.NODE_ENV === "development";
const path = require("path");
const dir = dev ? path.resolve(__dirname, "..") : __dirname;
const nextApp = next({ dev, dir });
const handle = nextApp.getRequestHandler();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRouter);

app.all("*", (req, res) => handle(req, res));

const preparePromise = nextApp.prepare();

if (dev) {
  const PORT = process.env.PORT || 5002;
  preparePromise.then(() => {
    app.listen(PORT, () =>
      console.log(`Dev server running on http://localhost:${PORT}`)
    );
  });
}

exports.nextApp = onRequest(
  { region: "us-central1" },
  async (req, res) => {
    await preparePromise;
    app(req, res);
  }
);
