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
    url: string
  ): Promise<void> => {
    try {
      if (!token) {
        throw new Error("Missing authorization token");
      }
      if (!title || !artist || !url) {
        throw new Error("Missing input");
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new Error("Unauthorized");
      }

      // now we need to check if the song already exists by using the title and artist
      title = formatString(title);
      artist = formatString(artist);

      const song = await this.songData.getSongByTitleAndArtist(title, artist);
      if (song) {
        throw new Error("Song already exists");
      }

      const id = generateId();
      const newSong: Song = new Song(id, title, artist, url, user.id);
      await this.songData.createSong(newSong);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  getSongById = async (id: string, token: string): Promise<Song> => {
    try {
      if (!id) {
        throw new Error("Missing input");
      }
      if (!token) {
        throw new Error("Missing authorization token");
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new Error("Unauthorized");
      }
      const song = await this.songData.getSongById(id);
      if (!song) {
        throw new Error("Song not found");
      }
      return song;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  deleteSong = async (id: string, token: string): Promise<void> => {
    try {
      if (!id) {
        throw new Error("Missing input");
      }
      if (!token) {
        throw new Error("Missing authorization token");
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new Error("Unauthorized");
      }
      const song = await this.songData.getSongById(id);
      if (!song) {
        throw new Error("Song not found");
      }
      if (song.userId !== user.id) {
        throw new Error("Only the owner can delete the song");
      }

      await this.songData.deleteSong(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
