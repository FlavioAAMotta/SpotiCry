export type songData = {
    id: string
}

export default class Song {
    public get duration(): number {
        return this._duration
    }
    public set duration(value: number) {
        this._duration = value
    }
    public get artist(): string {
        return this._artist
    }
    public set artist(value: string) {
        this._artist = value
    }
    public get title(): string {
        return this._title
    }
    public set title(value: string) {
        this._title = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
    
    constructor(
        private _id: string,
        private _title: string,
        private _artist: string,
        private _duration: number
    ){}
}
