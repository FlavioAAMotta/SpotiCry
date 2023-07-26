import { Request, Response } from "express";
import { PlaylistBusiness } from "../Business/PlaylistBusiness";

export class PlaylistController {
  constructor(private playlistBusiness: PlaylistBusiness) {}

  createPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const { userId, songs, description, name } = req.body;
      await this.playlistBusiness.createPlaylist(token, userId, songs, description, name);
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
}
