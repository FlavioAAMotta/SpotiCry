import { Authenticator } from "../services/Authenticator";
import { generateId } from "../services/IdGenerator";
import { IPlaylistData } from "../model/InterfacePlaylistData";
import Playlist from "../model/Playlist";
import { ISongData } from "../model/InterfaceSongData";

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
        throw new Error("Missing input");
      }
      if (!token) {
        throw new Error("Missing authorization token");
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new Error("Unauthorized");
      }

      this.checkIfSongExists(songs);

      const id = generateId();
      const playlist = new Playlist(id, name, description, songs, userId);
      await this.playlistData.createPlaylist(playlist);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  private checkIfSongExists = async (songsIds: string[]): Promise<void> => {
    const promises = songsIds.map(async (songId: string) => {
      const song = await this.songData.getSongById(songId);
      if (!song) {
        throw new Error("Song not found");
      }
    });
    await Promise.all(promises);
  };

  getPlaylistById = async (id: string, token: string): Promise<Playlist> => {
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

      const playlist = await this.playlistData.getPlaylistById(id);
      return playlist;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  getAllPlaylists = async (token: string): Promise<Playlist[]> => {
    try {
      if (!token) {
        throw new Error("Missing authorization token");
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new Error("Unauthorized");
      }

      const playlists = await this.playlistData.getAllPlaylists();
      return playlists;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  getPlaylistByTitle = async (title: string, token: string): Promise<Playlist[]> => {
    try {
      if (!title) {
        throw new Error("Missing input");
      }
      if (!token) {
        throw new Error("Missing authorization token");
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new Error("Unauthorized");
      }

      const playlists = await this.playlistData.getPlaylistByTitle(title);
      return playlists;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  getPlaylistSongs = async (id: string, token: string): Promise<string[]> => {
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

      const playlist = await this.playlistData.getPlaylistById(id);
      const songs = playlist.songs;
      return songs;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  addSongToPlaylist = async (
    playlistId: string,
    songId: string,
    token: string
  ): Promise<void> => {
    try {
      if (!playlistId || !songId) {
        throw new Error("Missing input");
      }
      if (!token) {
        throw new Error("Missing authorization token");
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new Error("Unauthorized");
      }

      const playlist = await this.playlistData.getPlaylistById(playlistId);
      const songs = playlist.songs;
      songs.push(songId);
      await this.playlistData.updatePlaylistSongs(playlistId, songs);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  deletePlaylist = async (id: string, token: string): Promise<void> => {
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

      await this.playlistData.deletePlaylist(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  removeSongFromPlaylist = async (
    playlistId: string,
    songId: string,
    token: string
  ): Promise<void> => {
    try {
      if (!playlistId || !songId) {
        throw new Error("Missing input");
      }
      if (!token) {
        throw new Error("Missing authorization token");
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new Error("Unauthorized");
      }

      const playlist = await this.playlistData.getPlaylistById(playlistId);
      const songs = playlist.songs;
      const filteredSongs = songs.filter((song) => song !== songId);
      await this.playlistData.updatePlaylistSongs(playlistId, filteredSongs);
    } catch (error: any) {
      throw new Error(error.message);
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
        throw new Error("Missing input");
      }
      if (!token) {
        throw new Error("Missing authorization token");
      }
      const user = this.authenticator.getTokenData(token);
      if (!user) {
        throw new Error("Unauthorized");
      }
      await this.playlistData.updatePlaylist(id, name, description);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
