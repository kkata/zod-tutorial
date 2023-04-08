// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const StarWarsPerson = z
  .object({
    name: z.string(),
  })
  .transform((data) => {
    return {
      ...data,
      nameAsArray: data.name.split(" "),
    };
  });
//^ 🕵️‍♂️

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

type StarWarsPerson = z.infer<typeof StarWarsPerson>;
type StarWarsPeopleResults = z.infer<typeof StarWarsPeopleResults>;

export const fetchStarWarsPeople = async () => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people.json"
  ).then((res) => res.json());

  const parsedData = StarWarsPeopleResults.parse(data);

  console.log(parsedData.results);

  return parsedData.results;
};

// TESTS

it("Should resolve the name and nameAsArray", async () => {
  expect((await fetchStarWarsPeople())[0]).toEqual({
    name: "Luke Skywalker",
    nameAsArray: ["Luke", "Skywalker"],
  });
});
