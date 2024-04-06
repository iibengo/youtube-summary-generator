import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { generateSummary } from "./operation/generate-summary";
import { YoutubeTranscript } from "youtube-transcript";
import { getTrascript } from "./operation/get-transcipt";
const youtubeTranscript = require("youtube-transcript");
const app = express();
const port = 3000;
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/generate", async (req: Request, res: Response) => {
  const videoUrl = req.body.videoUrl;
  try {
    // Obtener la transcripción del video de YouTube
    const transcipt = await getTrascript(videoUrl);
    // Crear el prompt para generar el resumen
    const prompt = `Give me a detailed summary of the following transcript to support the study: ${transcipt}`;
    // Generar el resumenxº
    const summary = await generateSummary(prompt);
    console.log(transcipt);
    res.send(summary);
  } catch (error) {
    console.error("Error al obtener la transcripción:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
