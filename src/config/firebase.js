import admin from 'firebase-admin';

import { ServiceAccount } from '../DB/firebase/proyecto-8e2ec-firebase-adminsdk-uhitv-bfa86eabea.json';

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
});

console.log('Base Firebase conectada!');

const dbFirebase = admin.firestore();

export { dbFirebase };
