import express from "express";
import { SongController } from "../Controller/SongController";
import SongData from "../Data/SongData";
import { SongBusiness } from "../Business/SongBusiness";

export const songRouter = express.Router();
const songData = new SongData();
const songBusiness = new SongBusiness(
    songData
);

const songController = new SongController(songBusiness);

songRouter.get("/", songController.getAllSongs);
songRouter.get("/:id", songController.getSongById);
songRouter.post("/", songController.createSong);
songRouter.delete("/:id", songController.deleteSong);
songRouter.patch("/:id", songController.editSong);