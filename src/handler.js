import serverless from "serverless-http";
import express from "express";
import upload from "./upload";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "./multer";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});
app.post("/upload", upload);

app.post("/upload2", multer.array("photos", 3), function(req, res, next) {
  res.send("Successfully uploaded " + req.files.length + " files!");
});

export const handler = serverless(app);
