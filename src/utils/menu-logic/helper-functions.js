// Take an object and reverse its key-value pairs
export const reverseMap = (hashTable) => {
  const result = {};
  for (let key in hashTable) {
    const value = hashTable[key];
    result[value] = key;
  }
  return result;
};

// Capitalize only the first letter of every word in the input string
export const toTitleCase = (phrase) => {
  if (typeof phrase === "string") {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } else console.log("toTitleCase function: the argument isn't a string");
};