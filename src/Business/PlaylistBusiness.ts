import { generateId } from "../services/IdGenerator";

export class PlaylistBusiness{
    createPlaylist = async (token: string, title: string, subtitle: string): Promise<void> => {
        // try {
        //     const id = generateId();
        //     const user = this.authenticator.getData(token);
        //     const playlist = new Playlist(id, title, subtitle, user.id);
        //     await this.playlistDatabase.createPlaylist(playlist);
        // } catch (error) {
        //     throw new Error(error.message);
        // }
    }
}