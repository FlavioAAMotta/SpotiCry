import { PlaylistBusiness } from "./../Business/PlaylistBusiness";
import express from "express";
import { PlaylistController } from "../Controller/PlaylistController";
import PlaylistData from "../Data/PlaylistData";
import SongData from "../Data/SongData";
export const playlistRouter = express.Router();

const playlistData = new PlaylistData();
const songData = new SongData();

const playlistBusiness = new PlaylistBusiness(
    playlistData,
    songData
);

const playlistController = new PlaylistController(playlistBusiness);

playlistRouter.post("/", playlistController.createPlaylist);
playlistRouter.get("/:id", playlistController.getPlaylistById);
playlistRouter.get("/", playlistController.getAllPlaylists);
playlistRouter.get("/search/:title", playlistController.getPlaylistByTitle);
playlistRouter.get("/:id/song", playlistController.getPlaylistSongs);
playlistRouter.post("/:id/song", playlistController.addSongToPlaylist);
playlistRouter.delete("/:id", playlistController.deletePlaylist);
playlistRouter.delete("/:id/song/:songId", playlistController.removeSongFromPlaylist);
playlistRouter.patch("/:id", playlistController.updatePlaylist);