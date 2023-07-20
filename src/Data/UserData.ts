// import * as admin from 'firebase-admin'
import { IUserData } from "../model/InterfaceUserData";
import User from "../model/User";
import { QueryDocumentSnapshot } from "@google-cloud/firestore";
const admin = require("firebase-admin");
import * as dotenv from 'dotenv';
dotenv.config();

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

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
