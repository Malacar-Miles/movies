// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// eslint-disable-next-line
import { getFirestore, doc, addDoc, getDoc, setDoc, updateDoc, collection, query, getDocs, } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKU3eKzWHL-1HeLuJ2i1DY3unM_r9Sir0",
  authDomain: "eastern-european-movies-app.firebaseapp.com",
  projectId: "eastern-european-movies-app",
  storageBucket: "eastern-european-movies-app.appspot.com",
  messagingSenderId: "50522610365",
  appId: "1:50522610365:web:709fef44550d5e5792b5d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a connection to the Firestore database
export const db = getFirestore(app);

// Write an object that contains movie data into the Firestore database
export const addMovieToDatabase = async (movie) => {
  try {
    // Write this object into the "movies" collection and use movie.id as the Firestore document id
    await setDoc(doc(db, "movies", movie.id), movie);
    console.log("Successfully added a movie to the database");
  } catch (error) {
    console.log("Failed to upload specific movie data to DB: ", error.message);
  }
};

// Get all movie documents from Firestore and return them as an array of objects
export const getAllMoviesFromDatabase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "movies"));
    const results = [];
    querySnapshot.forEach(movie => results.push(movie.data()));
    return results;
  } catch (error) {
    console.log("Failed to fetch all movie data from DB: ", error.message);
  }
};

// Get a movie document with a specific id from Firestore and return it as a movie object
// If the document doesn't exist, return null
export const getMovieFromDatabase = async (movieId) => {
  try {
    const movieDocument = await getDoc(doc(db, "movies", movieId));
    if (movieDocument.exists())
      return movieDocument.data();
    else
      return null;
  } catch (error) {
    console.log("Failed to fetch specific movie data from DB: ", error.message);
  }
};