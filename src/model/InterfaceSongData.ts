import Song from "./Song";

export interface ISongData{
    // createSong(song:Song):Promise<void>;
    getSongById(id:string):Promise<Song>;
    // getSongByName(name:string):Promise<Song>;
}
