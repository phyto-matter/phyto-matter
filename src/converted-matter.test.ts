import { groupBy } from "lodash";
import { MATTER_DATA } from "./converted-matter";
import { normaliseData } from "./utils/normalise-data";

const VALID_CATEGORIES = [
  "roof",
  "paving and bricks",
  "walls",
  "decor and paint",
  "edges",
  "furniture",
];
const VALID_PROCESSING = ["dry", "burn", "braid", "soak"];
const VALID_FUNCTIONS = [
  "structure",
  "filler",
  "plaster",
  "reinforcement",
  "decor",
  "paint",
];

function allValid(toTest: string, validation: string[]) {
  return toTest
    .split(",")
    .map((_) => _.trim())
    .every((t) => validation.includes(t));
}
describe("NORMALISED_MATTER_DATA", () => {
  const bySource = groupBy(
    normaliseData(MATTER_DATA, (e) => `${e.plant_genus}-${e.category}`),
    "source_file",
  );

  Object.entries(bySource).forEach(([source, entries]) => {
    describe(`${source} contains valid rows`, () => {
      describe("materials", () => {
        test("plant_genus is never empty", () => {
          expect(entries.every((_) => _.plant_genus)).toBe(true);
        });
        test("common_name is never empty", () => {
          expect(entries.every((_) => _.common_name)).toBe(true);
        });
        test("category is valid", () => {
          expect(
            entries.every((_) => allValid(_.category, VALID_CATEGORIES)),
          ).toBe(true);
        });
        test("processing is valid", () => {
          expect(
            entries.every((_) => allValid(_.processing, VALID_PROCESSING)),
          ).toBe(true);
        });
        test("building_material_function is valid", () => {
          expect(
            entries.every((_) =>
              allValid(_.building_material_function, VALID_FUNCTIONS),
            ),
          ).toBe(true);
        });
      });

      describe("projects", () => {
        test("project_title is never empty", () => {
          expect(entries.every((_) => _.project_title)).toBe(true);
        });
        test("project_author is never empty", () => {
          expect(entries.every((_) => _.project_author)).toBe(true);
        });
        test("project_link is never empty", () => {
          expect(entries.every((_) => _.project_link)).toBe(true);
        });
      });
    });
  });
});
