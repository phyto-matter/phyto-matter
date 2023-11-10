import { groupBy } from "lodash";
import { PHYTO_DATA } from "./converted-phyto";
import { normaliseData } from "./utils/normalise-data";
import { allValid } from "./utils/test-utils";
import { VALID_VEGETATION_TYPES } from "./global-constants";

describe("NORMALISED_PHYTO_DATA", () => {
  const bySource = groupBy(
    normaliseData(PHYTO_DATA, (e) => `${e.plant_genus} ${e.plant_species}`),
    "source_file",
  );

  Object.entries(bySource).forEach(([source, entries]) => {
    describe(`${source} contains valid rows`, () => {
      describe("reference", () => {
        test("reference is never empty", () => {
          expect(
            entries.every((_) => _.article_reference || _.book_reference),
          ).toBe(true);
        });
        test("title is never empty", () => {
          expect(entries.every((_) => _.article_title || _.book_title)).toBe(
            true,
          );
        });
        test("reference_link is never empty", () => {
          expect(entries.every((_) => _.article_link || _.book_link)).toBe(
            true,
          );
        });
      });

      describe("plants", () => {
        test("plant_species is never empty", () => {
          expect(entries.every((_) => _.plant_species)).toBe(true);
        });
        test("plant_genus is never empty", () => {
          expect(entries.every((_) => _.plant_genus)).toBe(true);
        });
        test("category is valid", () => {
          expect(
            entries.every((_) =>
              allValid(_.plant_category, VALID_VEGETATION_TYPES),
            ),
          ).toBe(true);
        });
      });

      describe("contaminants", () => {
        test("contaminant_type is never empty", () => {
          expect(entries.every((_) => _.contaminant_type)).toBe(true);
        });
        test("contaminant is never empty", () => {
          expect(entries.every((_) => _.contaminant)).toBe(true);
        });
        test("contaminant_abbreviation is never empty", () => {
          expect(entries.every((_) => _.contaminant_abbreviation)).toBe(true);
        });
      });

      describe("removal_rates", () => {
        test("removal_rate is never empty", () => {
          expect(entries.every((_) => _.removal_rate)).toBe(true);
        });
        test("removal_rate is numeric", () => {
          expect(
            entries.every((_) => !Number.isNaN(Number(_.removal_rate))),
          ).toBe(true);
        });
      });
    });
  });
});
