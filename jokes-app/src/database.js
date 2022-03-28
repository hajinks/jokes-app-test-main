// Set up Firebase as our database
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
// Other Firebase SDKS:
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBEp0FAf5gwKsWdfd4K931Id72qQbVvAtc",
  authDomain: "jokes-814d9.firebaseapp.com",
  databaseURL:
    "https://jokes-814d9-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "jokes-814d9",
  storageBucket: "jokes-814d9.appspot.com",
  messagingSenderId: "426108552771",
  appId: "1:426108552771:web:d27cffde23ef5bdf9f36f6",
  measurementId: "G-C026NNVGF1",
};
const firebaseApp = initializeApp(firebaseConfig);
const unrefDb = getDatabase(firebaseApp);
const jokesDb = ref(unrefDb);

export { jokesDb, unrefDb };
