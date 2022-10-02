import { addMovieToDatabase } from "../../utils/firebase/firebase"
import { moviesJSON } from "../../utils/firebase/movies-json"

const UploadDataButton = () => {
  const uploadData = () => {
    moviesJSON.forEach((movie) => addMovieToDatabase(movie));
  }

  return (
    <button onClick={uploadData}>Upload movies-json.js to the database</button>
  );
}

export default UploadDataButton;