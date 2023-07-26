import { DocumentSnapshot } from '@google-cloud/firestore';
import { IPlaylistData } from "../model/InterfacePlaylistData";
import Playlist from "../model/Playlist";
import { db } from "./FirebaseConfig";

export default class PlaylistData implements IPlaylistData {
  async createPlaylist(playlist: Playlist): Promise<void> {
    try {
      const docRef = db.collection("playlist").doc(playlist.id);
      await docRef.set({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        songs: playlist.songs,
        userId: playlist.userId,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getPlaylistById(id: string): Promise<Playlist> {
    try {
      const docRef = db.collection("playlist").doc(id);
      const playlist = docRef.get();
      return playlist.then((playlist: DocumentSnapshot) => {
        if (!playlist.exists) {
          throw new Error("Playlist not found");
        }
        const playlistData = playlist.data();
        return new Playlist(
          playlistData?.id,
          playlistData?.name,
          playlistData?.description,
          playlistData?.songs,
          playlistData?.userId
        );
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

}
