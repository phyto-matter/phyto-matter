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
      entries.forEach((_, i) => {
        const rowNumber = i + 2;

        describe(`row ${rowNumber} reference`, () => {
          test(`reference is never empty`, () => {
            expect(_.reference).toBeTruthy();
          });
          test(`text title is never empty`, () => {
            expect(_.text_title).toBeTruthy();
          });
          test(`reference_link is never empty`, () => {
            expect(_.article_link || _.book_link).toBeTruthy();
          });
        });

        describe(`row ${rowNumber} plants`, () => {
          test(`plant_species is never empty`, () => {
            expect(_.plant_species).toBeTruthy();
          });
          test(`plant_genus is never empty`, () => {
            expect(_.plant_genus).toBeTruthy();
          });
          test(`category ${_.plant_category} is valid`, () => {
            expect(allValid(_.plant_category, VALID_VEGETATION_TYPES)).toBe(
              true,
            );
          });
        });

        describe(`row ${rowNumber} contaminants`, () => {
          test("contaminant_type is never empty", () => {
            expect(_.contaminant_type).toBeTruthy();
          });
          test("contaminant is never empty", () => {
            expect(_.contaminant).toBeTruthy();
          });
          test("contaminant_abbreviation is never empty", () => {
            expect(_.contaminant_abbreviation).toBeTruthy();
          });
        });

        describe("removal_rates", () => {
          test("removal_rate is numeric", () => {
            expect(!Number.isNaN(Number(_.removal_rate || 0))).toBe(true);
          });
        });
      });
    });
  });
});
