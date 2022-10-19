import { decadeBoundaries } from "./decades";

it("returns null if the input is invalid", () => {
  expect(decadeBoundaries("2000s")).toEqual(null);
  expect(decadeBoundaries("2050")).toEqual(null);
  expect(decadeBoundaries("1910")).toEqual(null);
  expect(decadeBoundaries("1966")).toEqual(null);
});

it("returns an object containing the correct values of startingYear and endingYear", () => {
  expect(decadeBoundaries("1990")).toStrictEqual({ startingYear: 1990, endingYear: 2000 });
});