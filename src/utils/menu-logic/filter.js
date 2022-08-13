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

export const emptyFilter = {
  subs: new filterField(Object.keys(mapLanguageToCode)),
  genre: new filterField(Object.keys(mapGenreToId)),
  country: new filterField(Object.keys(mapCountryNounToAdjective)),
  decade: new filterField(allDecadesArray),
  director: new filterField([]),
  actors: new filterField([])
};