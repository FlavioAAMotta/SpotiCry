export type playlistData = {
    id: string
}

export default class Playlist {
    public get userId(): string {
        return this._userId
    }
    public set userId(value: string) {
        this._userId = value
    }
    public get songs(): string[] {
        return this._songs
    }
    public set songs(value: string[]) {
        this._songs = value
    }
    public get description(): string {
        return this._description
    }
    public set description(value: string) {
        this._description = value
    }
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
    
    constructor(
        private _id: string,
        private _name: string,
        private _description: string,
        private _songs: string[],
        private _userId: string
    ){}
}
