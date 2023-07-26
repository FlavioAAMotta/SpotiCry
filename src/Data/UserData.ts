import { IUserData } from "../model/InterfaceUserData";
import User from "../model/User";
import { QueryDocumentSnapshot } from "@google-cloud/firestore";
import { db } from "./FirebaseConfig";  // importando db de firebaseConfig.ts


export default class UserData implements IUserData {
  async findByEmail(email: string): Promise<User | null> {
    try {
      const userRef = db.collection("user");
      const snapshot = await userRef.where("email", "==", email).get();

      if (snapshot.empty) {
        console.log("No matching documents.");
        return null;
      }

      let user: User | null = null;
      snapshot.forEach((doc: QueryDocumentSnapshot) => {
        const userData = doc.data();
        user = new User(
          userData.id,
          userData.name,
          userData.email,
          userData.password
        );
      });

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async insertUser(user: User): Promise<User> {
    try {
      const docRef = db.collection("user").doc(user.id);
      await docRef.set({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      });
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
