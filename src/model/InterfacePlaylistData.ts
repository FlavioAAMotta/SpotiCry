import Playlist from "./Playlist";

export interface IPlaylistData{
    createPlaylist(playlist:Playlist):Promise<void>
    getPlaylistById(id:string):Promise<Playlist>
}
