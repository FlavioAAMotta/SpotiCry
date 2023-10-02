import { Authenticator } from "../services/Authenticator";
import { generateId } from "../services/IdGenerator";
import { IPlaylistData } from "../model/InterfacePlaylistData";
import Playlist from "../model/Playlist";
import { ISongData } from "../model/InterfaceSongData";
import { CustomError } from "../Utils/CustomError";

export class PlaylistBusiness {
  private authenticator: Authenticator;
  private playlistData: IPlaylistData;
  private songData: ISongData;

  constructor(
    playlistDataRepository: IPlaylistData,
    songDataRepository: ISongData
  ) {
    this.playlistData = playlistDataRepository;
    this.authenticator = new Authenticator();
    this.songData = songDataRepository;
  }

  createPlaylist = async (
    token: string,
    userId: string,
    songs: string[],
    description: string,
    name: string
  ): Promise<void> => {
    try {
      if (!userId || !songs || !description || !name) {
        throw new CustomError("Missing input", 400);
      }
      if (!token) {
        throw new CustomError("Missing authorization token", 401);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }

      this.checkIfSongExists(songs);

      const id = generateId();
      const playlist = new Playlist(id, name, description, songs, userId);
      await this.playlistData.createPlaylist(playlist);
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode);
    }
  };

  private checkIfSongExists = async (songsIds: string[]): Promise<void> => {
    try {
      const promises = songsIds.map(async (songId: string) => {
        const song = await this.songData.getSongById(songId);
        if (!song) {
          throw new CustomError("Song not found", 404);
        }
      });
      await Promise.all(promises);
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode || 500);
    }
  };

  getPlaylistById = async (id: string, token: string): Promise<Playlist> => {
    try {
      if (!id) {
        throw new CustomError("Missing input", 400);
      }
      if (!token) {
        throw new CustomError("Missing authorization token", 401);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }

      const playlist = await this.playlistData.getPlaylistById(id);
      if (!playlist) {
        throw new CustomError("Playlist not found", 404);
      }
      return playlist;
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode || 500);
    }
  };

  getAllPlaylists = async (token: string): Promise<Playlist[]> => {
    try {
      if (!token) {
        throw new CustomError("Missing authorization token", 401);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }

      return await this.playlistData.getAllPlaylists();
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode || 500);
    }
  };

  getPlaylistByTitle = async (
    title: string,
    token: string
  ): Promise<Playlist[]> => {
    try {
      if (!title) {
        throw new CustomError("Missing input", 400);
      }
      if (!token) {
        throw new CustomError("Missing authorization token", 401);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }

      return await this.playlistData.getPlaylistByTitle(title);
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode || 500);
    }
  };

  getPlaylistSongs = async (id: string, token: string): Promise<string[]> => {
    try {
      if (!id) {
        throw new CustomError("Missing input", 400);
      }
      if (!token) {
        throw new CustomError("Missing authorization token", 401);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }

      const playlist = await this.playlistData.getPlaylistById(id);
      if (!playlist) {
        throw new CustomError("Playlist not found", 404);
      }
      return playlist.songs;
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode || 500);
    }
  };

  addSongToPlaylist = async (
    playlistId: string,
    songId: string,
    token: string
  ): Promise<void> => {
    try {
      if (!playlistId || !songId) {
        throw new CustomError("Missing input", 400);
      }
      if (!token) {
        throw new CustomError("Missing authorization token", 401);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }

      const playlist = await this.playlistData.getPlaylistById(playlistId);
      if (!playlist) {
        throw new CustomError("Playlist not found", 404);
      }

      const songs = playlist.songs;
      songs.push(songId);
      await this.playlistData.updatePlaylistSongs(playlistId, songs);
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode || 500);
    }
  };

  deletePlaylist = async (id: string, token: string): Promise<void> => {
    try {
      if (!id) {
        throw new CustomError("Missing input", 400);
      }
      if (!token) {
        throw new CustomError("Missing authorization token", 401);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }

      await this.playlistData.deletePlaylist(id);
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode || 500);
    }
  };

  removeSongFromPlaylist = async (
    playlistId: string,
    songId: string,
    token: string
  ): Promise<void> => {
    try {
      if (!playlistId || !songId) {
        throw new CustomError("Missing input", 400);
      }
      if (!token) {
        throw new CustomError("Missing authorization token", 401);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }

      const playlist = await this.playlistData.getPlaylistById(playlistId);
      if (!playlist) {
        throw new CustomError("Playlist not found", 404);
      }

      const songs = playlist.songs;
      const filteredSongs = songs.filter((song) => song !== songId);
      await this.playlistData.updatePlaylistSongs(playlistId, filteredSongs);
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode || 500);
    }
  };

  updatePlaylist = async (
    id: string,
    name: string,
    description: string,
    token: string
  ): Promise<void> => {
    try {
      if (!id || (!name && !description)) {
        throw new CustomError("Missing input", 400);
      }
      if (!token) {
        throw new CustomError("Missing authorization token", 401);
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new CustomError("Unauthorized", 401);
      }

      await this.playlistData.updatePlaylist(id, name, description);
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode || 500);
    }
  };
}
