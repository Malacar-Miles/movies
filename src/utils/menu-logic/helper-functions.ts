// Take an object and reverse its key-value pairs
type hashTable = Record<string | number, string | number>;
export const reverseMap = (hashTable: hashTable) => {
  const result: hashTable = {};
  for (let key in hashTable) {
    const value = hashTable[key];
    result[value] = key;
  }
  return result;
};

// Capitalize only the first letter of every word in the input string
export const toTitleCase = (phrase: string) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
