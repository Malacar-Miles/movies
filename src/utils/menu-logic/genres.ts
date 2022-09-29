import { reverseMap } from "./helper-functions"

// Map a genre ID that's used in the URL to a string that's shown in the UI
export const mapIdToGenre: Record<string, string> = {
  "comedy": "Comedy",
  "melodrama": "Romance",
  "drama": "Drama",
  "adventure": "Adventure",
  "sci-fi": "Science Fiction",
  "mystery": "Mystery",
  "fantasy": "Fantasy",
  "action-movies": "Action Movies",
  "thrillers": "Thrillers",
  "war-movies": "War Movies",
  "crime-movies": "Crime Movies",
  "historical-movies": "Historical Movies",
  "fairy-tale-movies": "Fairy Tale Movies",
  "tv-series": "TV Series",
  "animation": "Animation",
  "horror": "Horror Movies",
  "erotica": "Erotic Movies",
  "family-movies": "Family Movies",
  "short": "Short Movies",
};

// Map a genre string that's shown in the UI to an ID that's used in the URL
export const mapGenreToId = reverseMap(mapIdToGenre);