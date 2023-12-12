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
      describe("materials", () => {
        test("plant_genus is never empty", () => {
          expect(entries.every((_) => _.plant_genus)).toBe(true);
        });
        test("name is never empty", () => {
          expect(entries.every((_) => _.name)).toBe(true);
        });
        test("type is valid", () => {
          expect(
            entries.every((_) => allValidOrEmpty(_.type, VALID_MATERIAL_TYPES)),
          ).toBe(true);
        });
        test("processing is valid", () => {
          expect(
            entries.every((_) =>
              allValidOrEmpty(_.processing, VALID_PROCESSING),
            ),
          ).toBe(true);
        });
        test("function is valid", () => {
          expect(
            entries.every((_) => allValidOrEmpty(_.function, VALID_FUNCTIONS)),
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
