import { groupBy } from "lodash";
import { MATTER_DATA } from "./converted-matter";
import { normaliseData } from "./utils/normalise-data";
import { allValidOrEmpty } from "./utils/test-utils";
import {
  VALID_MATERIAL_TYPES,
  VALID_FUNCTIONS,
  VALID_PROCESSING,
} from "./global-constants";

describe("NORMALISED_MATTER_DATA", () => {
  const bySource = groupBy(
    normaliseData(MATTER_DATA, (e) => `${e.plant_genus}-${e.category}`),
    "source_file",
  );

  Object.entries(bySource).forEach(([source, entries]) => {
    describe(`${source} contains valid rows`, () => {
      entries.forEach((_, i) => {
        const rowNumber = i + 2;

        describe(`row ${rowNumber} materials`, () => {
          test(`name is never empty`, () => {
            expect(_.material_name).toBeTruthy();
          });
          test(`plant_genus is not empty`, () => {
            expect(_.plant_genus).toBeTruthy();
          });
          test(`type ${_.type} is valid`, () => {
            expect(allValidOrEmpty(_.type, VALID_MATERIAL_TYPES)).toBe(true);
          });
          test(`processing ${_.processing} is valid`, () => {
            expect(allValidOrEmpty(_.processing, VALID_PROCESSING)).toBe(true);
          });
          test(`function ${_.function} is valid`, () => {
            expect(allValidOrEmpty(_.function, VALID_FUNCTIONS)).toBe(true);
          });
        });

        describe(`row ${rowNumber} projects`, () => {
          test(`project_title is never empty`, () => {
            expect(_.project_title).toBeTruthy();
          });
          test(`project_author is never empty`, () => {
            expect(_.project_author).toBeTruthy();
          });
          test(`project_link is never empty`, () => {
            expect(_.project_link).toBeTruthy();
          });
        });
      });
    });
  });
});
