// Take an object and reverse its key-value pairs
type HashTable = Record<string | number, string | number>;
export const reverseMap = (hashTable: HashTable) => {
  const result: HashTable = {};
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
