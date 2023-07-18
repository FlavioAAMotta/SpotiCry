// import * as admin from 'firebase-admin'
import { IUserData } from "../model/InterfaceUserData";
import User from "../model/User";
import { QueryDocumentSnapshot } from "@google-cloud/firestore";

// Usar isso dentro do terminal
// export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
// admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     databaseURL: 'https://spoticry.firebaseio.com'
// });
const admin = require("firebase-admin");
const serviceAccount = require("C:\\Users\\Pichau\\.ssh\\spoticry-e8e8d-firebase-adminsdk-84g1b-8d6759b387.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

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
        console.log(doc.id, "=>", doc.data());
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
