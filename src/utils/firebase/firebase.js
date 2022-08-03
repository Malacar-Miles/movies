// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// eslint-disable-next-line
import { getFirestore, doc, addDoc, getDoc, setDoc, updateDoc, collection, query, getDocs, where, FieldValue } from "firebase/firestore";

import { categories } from "../menu-logic/categories";
import { toTitleCase } from "../menu-logic/helper-functions";
import { mapIdToGenre } from "../menu-logic/genres";
import { mapLanguageToCode } from "../menu-logic/language-codes";
import { decadeBoundaries } from "../menu-logic/decades";

// My web app's Firebase configuration
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
const db = getFirestore(app);

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

// Get get a filtered subset of movie documents from Firestore and return it as an array of objects
export const getMoviesByCategoryFromDatabase = async (categoryId, itemId) => {
  try {
    let q;
    const moviesCollection = collection(db, "movies");

    // Form a query based on the values of categoryId and itemId
    switch (categoryId) {
      case categories.genre:
        q = query(moviesCollection, where("genre", "array-contains", mapIdToGenre[itemId]));
        break;
      case categories.country:
        q = query(moviesCollection, where("country", "array-contains", toTitleCase(itemId)));
        break;
      case categories.subtitles:
        q = query(moviesCollection, where("subs", "array-contains", mapLanguageToCode[toTitleCase(itemId)]));
        break;
      case categories.decade:
        const years = decadeBoundaries(itemId);
        if (!years) throw new Error("Invalid decade");
        q = query(moviesCollection, where("year", ">=", years.startingYear), where("year", "<=", years.endingYear));
        break;
      default:
        throw new Error("Invalid categoryId");
    }
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach(movie => results.push(movie.data()));
    return results;
  } catch (error) {
    console.log("Failed to fetch filtered movie data from DB: ", error.message);
  }
};

// Get a movie document with a specific id from Firestore, return it as a movie object and update the viewcount
export const getMovieFromDatabase = async (movieId) => {
  try {
    const movieDocRef = doc(db, "movies", movieId);
    const movieDocument = await getDoc(movieDocRef);
    if (movieDocument.exists()) {
      // Update the views field in the database then return the movie object
      const movie = movieDocument.data();
      updateDoc(movieDocRef, { views: movie.views + 1 });
      // Also update the viewcount in the object to be returned
      movie.views++;
      return movie;
    }
    // If the document doesn't exist, return null
    else return null;
  } catch (error) {
    console.log("Failed to fetch specific movie data from DB: ", error.message);
  }
};