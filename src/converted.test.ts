import { groupBy } from "lodash";
import { ALL_DATA } from "./converted";

describe("NORMALISED_DATA", () => {
  const bySource = groupBy(ALL_DATA, "source_file");

  Object.entries(bySource).forEach(([source, entries]) => {
    describe(`${source} contains valid rows`, () => {
      describe("refernce", () => {
        test("reference is never empty", () => {
          expect(entries.every((_) => _.reference)).toBe(true);
        });
        test("title is never empty", () => {
          expect(entries.every((_) => _.title)).toBe(true);
        });
        test("reference_link is never empty", () => {
          expect(entries.every((_) => _.reference_link)).toBe(true);
        });
        test("publication_year is never empty", () => {
          expect(entries.every((_) => _.publication_year)).toBe(true);
        });
        test("first_author is never empty", () => {
          expect(entries.every((_) => _.first_author)).toBe(true);
        });
      });

      describe("plants", () => {
        test("plant_species is never empty", () => {
          expect(entries.every((_) => _.plant_species)).toBe(true);
        });
        test("plant_name is never empty", () => {
          expect(entries.every((_) => _.plant_name)).toBe(true);
        });
        test("common_name is never empty", () => {
          expect(entries.every((_) => _.common_name)).toBe(true);
        });
        test("plant_family is never empty", () => {
          expect(entries.every((_) => _.plant_family)).toBe(true);
        });
      });

      describe("contaminants", () => {
        test("contaminant_type is never empty", () => {
          expect(entries.every((_) => _.contaminant_type)).toBe(true);
        });
        test("contaminant is never empty", () => {
          expect(entries.every((_) => _.contaminant)).toBe(true);
        });
        test("contaminant_symbol is never empty", () => {
          expect(entries.every((_) => _.contaminant_symbol)).toBe(true);
        });
      });

      describe("removal_rates", () => {
        test("removal_rate is never empty", () => {
          expect(entries.every((_) => _.removal_rate)).toBe(true);
        });
        test("removal_rate is numeric", () => {
          expect(entries.every((_) => Number.isFinite(_ / 1))).toBe(true);
        });
        test("contaminant is never empty", () => {
          expect(entries.every((_) => _.contaminant)).toBe(true);
        });
        test("contaminant_symbol is never empty", () => {
          expect(entries.every((_) => _.contaminant_symbol)).toBe(true);
        });
      });
    });
  });
});
