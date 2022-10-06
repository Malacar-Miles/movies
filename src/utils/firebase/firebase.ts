import { initializeApp } from "firebase/app";

import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, getDocs, where } from "firebase/firestore";

import { categories } from "../menu-logic/categories";
import { toTitleCase } from "../menu-logic/helper-functions";
import { mapIdToGenre } from "../menu-logic/genres";
import { mapLanguageToCode } from "../menu-logic/language-codes";
import { decadeBoundaries } from "../menu-logic/decades";
import { Movie } from "../types/types";

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
export const addMovieToDatabase = async (movie: Movie) => {
  try {
    // Write this object into the "movies" collection and use movie.id as the Firestore document id
    await setDoc(doc(db, "movies", movie.id), movie);
    console.log("Successfully added a movie to the database");
  } catch (error) {
    if (error instanceof Error) console.log("Failed to upload specific movie data to DB: ", error.message);
  }
};

// Get all movie documents from Firestore and return them as an array of objects
export const getAllMoviesFromDatabase = async () => {
  const results: Movie[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "movies"));
    querySnapshot.forEach(movie => results.push(movie.data() as Movie));
  } catch (error) {
    if (error instanceof Error) console.log("Failed to fetch all movie data from DB: ", error.message);
  }
  return results;
};

// Get get a filtered subset of movie documents from Firestore and return it as an array of objects
export const getMoviesByCategoryFromDatabase = async (categoryId: string, itemId: string) => {
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
    const results: Movie[] = [];
    querySnapshot.forEach(movie => results.push(movie.data() as Movie));
    return results;
  } catch (error) {
    if (error instanceof Error) console.log("Failed to fetch filtered movie data from DB: ", error.message);
  }
};

// Get all movie documents from Firestore, then filter them, returning only those whose titles match the search query.
// This is inefficient, but Firestore doesn't support searching by substrings.
export const searchAllMoviesFromDatabase = async (searchQuery: string) => {
  const searchForSubstring = (stringToCheck: string, subString: string) => {
    // This is a helper function that returns true if stringToCheck contains every word from subString
    const wordsToCheck = stringToCheck.toLowerCase().split(" ");
    const wordsFromSubString = subString.toLowerCase().split(" ");
    let result = true;
    wordsFromSubString.forEach((word) => {
      if (!wordsToCheck.includes(word)) result = false;
    });
    return result;
  };

  try {
    const querySnapshot = await getDocs(collection(db, "movies"));
    const results: Movie[] = [];
    querySnapshot.forEach((movie) => results.push(movie.data() as Movie));
    const filteredResults = results.filter((movie) =>
      searchForSubstring(movie.title, searchQuery)
    );
    return filteredResults;
  } catch (error) {
    if (error instanceof Error) console.log("Failed to fetch all movie data from DB for searching: ", error.message);
  }
};

// Get a movie document with a specific id from Firestore, return it as a movie object and update the viewcount
export const getMovieFromDatabase = async (movieId: string) => {
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
    if (error instanceof Error) console.log("Failed to fetch specific movie data from DB: ", error.message);
  }
};