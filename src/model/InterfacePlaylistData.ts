import Playlist from "./Playlist";

export interface IPlaylistData{
    createPlaylist(playlist:Playlist):Promise<void>
    getPlaylistById(id:string):Promise<Playlist>
    getAllPlaylists():Promise<Playlist[]>
    getPlaylistByTitle(title:string):Promise<Playlist[]>
    getPlaylistSongs(id:string):Promise<Playlist>
    updatePlaylistSongs(id:string, songs:string[]):Promise<void>
    deletePlaylist(id:string):Promise<void>
    removeSongFromPlaylist(id:string, songId:string):Promise<void>
    updatePlaylist(id:string, title:string, description:string):Promise<void>
    getPlaylistByUserId(userId:string): Promise<Playlist[]>
}
