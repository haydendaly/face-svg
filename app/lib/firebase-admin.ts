import * as admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = require("../../firebase-admin-key.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();

export { firestore };
