import { DocumentSnapshot } from "@google-cloud/firestore";
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

    async getAllPlaylists(): Promise<Playlist[]> {
        try {
            const playlists: Playlist[] = [];
            const playlistsRef = await db.collection("playlist").get();
            playlistsRef.forEach((playlist: any) => {
                const playlistData = playlist.data();
                playlists.push(
                    new Playlist(
                        playlistData.id,
                        playlistData.name,
                        playlistData.description,
                        playlistData.songs,
                        playlistData.userId
                    )
                );
            });
            return playlists;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getPlaylistByTitle(title: string): Promise<Playlist[]> {
        try {
            const playlists: Playlist[] = [];
            const playlistsRef = await db
                .collection("playlist")
                .where("name", "==", title)
                .get();
            playlistsRef.forEach((playlist: any) => {
                const playlistData = playlist.data();
                playlists.push(
                    new Playlist(
                        playlistData.id,
                        playlistData.name,
                        playlistData.description,
                        playlistData.songs,
                        playlistData.userId
                    )
                );
            });
            return playlists;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getPlaylistSongs(id: string): Promise<Playlist> {
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

    async updatePlaylistSongs(id: string, songs: string[]): Promise<void> {
        try {
            const docRef = db.collection("playlist").doc(id);
            await docRef.update({
                songs: songs,
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deletePlaylist(id: string): Promise<void> {
        try {
            const docRef = db.collection("playlist").doc(id);
            await docRef.delete();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async removeSongFromPlaylist(id: string, songId: string): Promise<void> {
        try {
            const playlist = await this.getPlaylistById(id);
            const songs = playlist.songs;
            const index = songs.indexOf(songId);
            if (index > -1) {
                songs.splice(index, 1);
            }
            await this.updatePlaylistSongs(id, songs);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updatePlaylist(
        id: string,
        title?: string,
        description?: string
    ): Promise<void> {
        try {
            const updateData: { [key: string]: string } = {};

            if (title) {
                updateData.name = title;
            }

            if (description) {
                updateData.description = description;
            }

            const docRef = db.collection("playlist").doc(id);
            await docRef.update(updateData);
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    async getPlaylistUser(userId: string): Promise<Playlist[]> {
        try {
            const playlists: Playlist[] = []
            const playlistRef = await db
                .collection("playlist")
                .where("userId", "==", userId)
                .get();
            playlistRef.forEach((playlist: any) => {
                const playlistData = playlist.data()
                playlists.push(new Playlist(
                    playlistData.id,
                    playlistData.name,
                    playlistData.description,
                    playlistData.songs,
                    playlistData.userId
                ))
            })
            return playlists
        } catch (error: any) {
            throw new Error(error.message)
        }
    };
}
