import { ISongData } from "../model/InterfaceSongData";
import Song from "../model/Song";
import { db } from "./FirebaseConfig";
import { DocumentSnapshot } from "@google-cloud/firestore";

export default class SongData implements ISongData {
  async getSongById(id: string): Promise<Song> {
    try {
      const docRef = db.collection("song").doc(id);
      const song = docRef.get();
      return song.then((song: DocumentSnapshot) => {
        if (!song.exists) {
          throw new Error("Song not found");
        }
        const songData = song.data();
        return new Song(
          id,
          songData?.title,
          songData?.artist,
          songData?.url,
          songData?.userId
        );
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createSong(song: Song): Promise<void> {
    try {
      const docRef = db.collection("song").doc(song.id);
      await docRef.set({
        title: song.title,
        artist: song.artist,
        url: song.url,
        userId: song.userId,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getSongByTitleAndArtist(
    title: string,
    artist: string
  ): Promise<Song | undefined> {
    try {
      const song = await db
        .collection("song")
        .where("title", "==", title)
        .where("artist", "==", artist)
        .get();
      if (song.empty) {
        return undefined;
      }
      return song.docs[0].data() as Song;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteSong(id: string): Promise<void> {
    try {
      const docRef = db.collection("song").doc(id);
      await docRef.delete();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllSongs(): Promise<Song[]> {
    try {
      const songs = await db.collection("song").get();
      return songs.docs.map((song: any) => {
        const songData = song.data();
        return new Song(
          song.id,
          songData.title,
          songData.artist,
          songData.url,
          songData.userId
        );
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async editSong(
    id: string,
    title: string,
    artist: string,
    url: string
  ): Promise<void> {
    try {
      const docRef = db.collection("song").doc(id);
      await docRef.update({
        title,
        artist,
        url,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
