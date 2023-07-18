import User from "./User"

export interface IUserData{
    findByEmail(email: string): Promise<User | null>
    insertUser(user:User):Promise<User>
}

