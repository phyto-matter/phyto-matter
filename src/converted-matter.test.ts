import { groupBy } from "lodash";
import { MATTER_DATA } from "./converted-matter";
import { normaliseData } from "./utils/normalise-data";
import { allValid } from "./utils/test-utils";
import {
  VALID_CATEGORIES,
  VALID_FUNCTIONS,
  VALID_PROCESSING,
  VALID_VEGETATION_TYPES,
} from "./global-constants";

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
        test("vegetation_type is valid", () => {
          expect(
            entries.every((_) =>
              allValid(_.vegetation_type, VALID_VEGETATION_TYPES),
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
