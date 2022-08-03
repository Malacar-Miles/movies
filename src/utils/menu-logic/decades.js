export const decadeBoundaries = (inputYearString) => {
  const inputYear = Number(inputYearString);

  // Validate input
  const minYear = 1930,
    maxYear = 2010;
  // If the input isn't a number or it isn't divisible by 10 or it's outside the valid range, return null
  if (
    Number.isNaN(inputYear) ||
    inputYear % 10 !== 0 ||
    inputYear < minYear ||
    inputYear > maxYear
  )
    return null;

  // Now that we know the input is valid, return the starting year and ending year of the decade
  return {
    startingYear: inputYear,
    endingYear: inputYear + 10,
  };
};

