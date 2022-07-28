import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const serviceAccount = require('./file.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log('Base Firebase conectada!');

const dbFirebase = admin.firestore();

export { dbFirebase };
