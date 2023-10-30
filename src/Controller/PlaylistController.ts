import { Request, Response } from "express";
import { PlaylistBusiness } from "../Business/PlaylistBusiness";

export class PlaylistController {
  constructor(private playlistBusiness: PlaylistBusiness) {}

  createPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const { songs, description, name } = req.body;
      await this.playlistBusiness.createPlaylist(token, songs, description, name);
      res.status(200).send({ message: "Playlist created successfully" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };

  getPlaylistById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const token = req.headers.authorization as string;
      const playlist = await this.playlistBusiness.getPlaylistById(id, token);
      res.status(200).send({ playlist });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };

  getAllPlaylists = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const playlists = await this.playlistBusiness.getAllPlaylists(token);
      res.status(200).send({ playlists });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };

  getPlaylistByTitle = async (req: Request, res: Response): Promise<void> => {
    try {
      const title = req.params.title;
      const token = req.headers.authorization as string;
      const playlists = await this.playlistBusiness.getPlaylistByTitle(title, token);
      res.status(200).send({ playlists });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };
  getPlaylistSongs = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const token = req.headers.authorization as string;
      const songs = await this.playlistBusiness.getPlaylistSongs(id, token);
      res.status(200).send({ songs });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };
  
  addSongToPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id;
      const { songId } = req.body;
      await this.playlistBusiness.addSongToPlaylist(id, songId, token);
      res.status(200).send({ message: "Song added to playlist successfully" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };


  deletePlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const token = req.headers.authorization as string;
      await this.playlistBusiness.deletePlaylist(id, token);
      res.status(200).send({ message: "Playlist deleted successfully" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };
  removeSongFromPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const playlistId = req.params.id;
      const songId = req.params.songId;
      await this.playlistBusiness.removeSongFromPlaylist(playlistId, songId, token);
      res.status(200).send({ message: "Song removed from playlist successfully" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };

  updatePlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id;
      const { name, description } = req.body;
      await this.playlistBusiness.updatePlaylist(id, name, description, token);
      res.status(200).send({ message: "Playlist updated successfully" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
}
