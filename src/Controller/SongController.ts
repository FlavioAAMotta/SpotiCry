import { Request, Response } from "express";
import { SongBusiness } from "../Business/SongBusiness";


export class SongController{
    constructor(private songBusiness: SongBusiness){}

    createSong = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const { title, artist, url, albumImageURL } = req.body;
            await this.songBusiness.createSong(token, title, artist, url, albumImageURL);
            res.status(200).send({ message: "Song created successfully" });
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }

    getSongById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const token = req.headers.authorization as string;
            const song = await this.songBusiness.getSongById(id, token);
            res.status(200).send({ song });
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }

    deleteSong = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const token = req.headers.authorization as string;
            await this.songBusiness.deleteSong(id, token);
            res.status(200).send({ message: "Song deleted successfully" });
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }

    getAllSongs = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const songs = await this.songBusiness.getAllSongs(token);
            res.status(200).send({ songs });
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }

    editSong = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const token = req.headers.authorization as string;
            const { title, artist, url, albumImageURL } = req.body;
            await this.songBusiness.editSong(id, token, title, artist, url, albumImageURL);
            res.status(200).send({ message: "Song edited successfully" });
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }
}