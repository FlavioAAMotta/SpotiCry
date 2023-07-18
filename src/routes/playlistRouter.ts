import { PlaylistBusiness } from "./../Business/PlaylistBusiness";
import express from "express";
import { PlaylistController } from "../Controller/PlaylistController";
export const playlistRouter = express.Router();

const playlistBusiness = new PlaylistBusiness();

const playlistController = new PlaylistController(playlistBusiness);

playlistRouter.post("/", playlistController.createPlaylist);
