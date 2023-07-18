import { Request, Response } from "express";
import { PlaylistBusiness } from "../Business/PlaylistBusiness";

export class PlaylistController {
  constructor(private playlistBusiness: PlaylistBusiness) {}

  createPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const { title, subtitle } = req.body;
      await this.playlistBusiness.createPlaylist(token, title, subtitle);
      res.status(200).send({ message: "Playlist created successfully" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  };
}
