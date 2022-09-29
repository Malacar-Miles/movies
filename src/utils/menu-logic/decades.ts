export const minDecade = 1930, maxDecade = 2010;

export const decadeBoundaries = (inputYearString: string) => {
  const inputYear = Number(inputYearString);

  // Validate input
  // If the input isn't a number or it isn't divisible by 10 or it's outside the valid range, return null
  if (
    Number.isNaN(inputYear) ||
    inputYear % 10 !== 0 ||
    inputYear < minDecade ||
    inputYear > maxDecade
  )
    return null;

  // Now that we know the input is valid, return the starting year and ending year of the decade
  return {
    startingYear: inputYear,
    endingYear: inputYear + 10,
  };
};

const calculateAllDecades = () => {
  const result = [];
  for (let i = minDecade; i <= maxDecade; i = i + 10)
    result.push(i);
  return(result);
}

// This array will be used for rendering some menus
export const allDecadesArray = calculateAllDecades();
