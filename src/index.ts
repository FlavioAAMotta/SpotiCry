import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { playlistRouter } from "./routes/playlistRouter";
import { userRouter } from "./routes/userRouter";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/playlist", playlistRouter);
app.use("/user", userRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.error(`Failure initializing server.`);
  }
});
