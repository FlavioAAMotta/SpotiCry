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
          songData?.id,
          songData?.title,
          songData?.artist,
          songData?.duration
        );
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
