import { mapLanguageToCode } from "./language-codes";
import { mapGenreToId } from "./genres";
import { mapCountryNounToAdjective } from "./countries";
import { allDecadesArray } from "./decades";

class filterField {
  constructor(possibleValues) {
    this.fieldPossibleValues = possibleValues;
    this.fieldCurrentValues = [];
  }
}

const emptyFilterWithTypes = {
  subs: new filterField(Object.keys(mapLanguageToCode)),
  genre: new filterField(Object.keys(mapGenreToId)),
  country: new filterField(Object.keys(mapCountryNounToAdjective)),
  decade: new filterField(allDecadesArray),
  director: new filterField([]),
  actors: new filterField([])
};

// Turn this object into a generic JS object to avoid "non-serializable data" error in Redux
export const emptyFilter = JSON.parse(JSON.stringify(emptyFilterWithTypes));