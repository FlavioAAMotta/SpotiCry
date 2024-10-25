import { CustomError } from "../Utils/CustomError";
import { formatString } from "../Utils/StringFormatter";
import { ISongData } from "../model/InterfaceSongData";
import Song from "../model/Song";
import { Authenticator } from "../services/Authenticator";
import { generateId } from "../services/IdGenerator";

export class SongBusiness {
  private songData: ISongData;
  private authenticator: Authenticator;

  constructor(songData: ISongData) {
    this.songData = songData;
    this.authenticator = new Authenticator();
  }

  createSong = async (
    token: string,
    title: string,
    artist: string,
    url: string,
    albumImageURL: string
  ): Promise<void> => {
    try {
      if (!token) {
        throw new CustomError("Missing authorization token", 422);
      }
      if (!title || !artist || !url) {
        throw new CustomError("Missing input", 422);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }

      title = formatString(title);
      artist = formatString(artist);

      const song = await this.songData.getSongByTitleAndArtist(title, artist);
      if (song) {
        throw new CustomError("Song already exists", 409);
      }

      const id = generateId();
      const index = Math.floor(Math.random() * 1000);
      const getRandomAlbumImage = `https://robohash.org/${index}.png?size=300x300&set=set4`;
      albumImageURL = albumImageURL || getRandomAlbumImage;
      const newSong: Song = new Song(id, title, artist, url, user.id, albumImageURL);
      await this.songData.createSong(newSong);
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode);
    }
  };

  getSongById = async (id: string, token: string): Promise<Song> => {
    try {
      if (!id) {
        throw new CustomError("Missing input", 422);
      }
      if (!token) {
        throw new CustomError("Missing authorization token", 422);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }
      const song = await this.songData.getSongById(id);
      if (!song) {
        throw new CustomError("Song not found", 404);
      }
      return song;
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode);
    }
  };

  deleteSong = async (id: string, token: string): Promise<void> => {
    try {
      if (!id) {
        throw new CustomError("Missing input", 422);
      }
      if (!token) {
        throw new CustomError("Missing authorization token", 422);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }
      const song = await this.songData.getSongById(id);
      if (!song) {
        throw new CustomError("Song not found", 404);
      }
      if (song.userId !== user.id) {
        throw new CustomError("Only the owner can delete the song", 401);
      }

      await this.songData.deleteSong(id);
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode);
    }
  };

  getAllSongs = async (token: string): Promise<Song[]> => {
    try {
      if (!token) {
        throw new CustomError("Missing authorization token", 422);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }
      const songs = await this.songData.getAllSongs();
      return songs;
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode);
    }
  };

  editSong = async (
    id: string,
    token: string,
    title: string,
    artist: string,
    url: string,
    albumImageURL: string
  ): Promise<void> => {
    try {
      if (!id || !token || (!title && !artist && !url && !albumImageURL)) {
        throw new CustomError("Missing input", 422);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }
      const song = await this.songData.getSongById(id);
      if (!song) {
        throw new CustomError("Song not found", 404);
      }
      if (song.userId !== user.id) {
        throw new CustomError("Only the owner can edit the song", 401);
      }

      if (title) {
        title = formatString(title);
      }
      if (artist) {
        artist = formatString(artist);
      }

      const songWithSameTitleAndArtist =
        await this.songData.getSongByTitleAndArtist(title, artist);
      if (songWithSameTitleAndArtist) {
        throw new CustomError("Song already exists", 409);
      }

      await this.songData.editSong(id, title, artist, url, albumImageURL);
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode);
    }
  };
}
