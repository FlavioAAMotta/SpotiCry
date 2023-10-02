import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { playlistRouter } from "./routes/playlistRouter";
import { userRouter } from "./routes/userRouter";
import { songRouter } from "./routes/songRouter";
import serverless from "serverless-http"; // Importe serverless-http

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Recebido ${req.method} em ${req.url}`);
    next();
});


app.use("/default/playlist", playlistRouter);
app.use("/default/user", userRouter);
app.use("/default/song", songRouter);

app.all("*", (req, res) => {
    res.status(404).send(`Não encontrado: ${req.method} ${req.url}`);
});

export const handler = serverless(app);
