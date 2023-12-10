import { groupBy, kebabCase, lowerCase, values } from "lodash";
import { PHYTO_DATA } from "../converted-phyto";
import { normaliseData } from "./normalise-data";

export type ReferenceEntry = {
  title: string;
  reference: string;
  type: "article" | "book";
  link: string;
};

export type RemovalRateEntry = {
  removal_rate: number;
  notes: string;
  reference: ReferenceEntry;
};

export type ContaminantEntry = {
  id: string;
  name: string;
  abbreviation: string;
  category: string;
  image: string;
  removal_rates: RemovalRateEntry[];
  tissue_type: string;
  mass_kg_m2: number;
};

export type PlantEntry = {
  id: string;
  genus: string;
  cultivar: string;
  category: string;
  species: string;
  organic_inorganic: string;
  phyto_process: string;
  growth_rate: string;
  image: string;
  contaminants: ContaminantEntry[];
  us_hardiness_zone: string;
  shade: string;
  soil_type: string;
  soil_ph: string;
  moisture: string;
  height: string;
  geography: string;
  seasonal_interest_spring: string;
  seasonal_interest_summer: string;
  seasonal_interest_fall: string;
  seasonal_interest_winter: string;
  contributingCount: number;
};

export const NORMALISED_PHYTO_DATA = getNormalisedPhytoData();

function getNormalisedPhytoData() {
  const normalised = normaliseData(
    PHYTO_DATA,
    (e) => `${e.plant_genus} ${e.plant_species}`,
  );

  return Object.values(groupBy(normalised, "id")).map(
    ([first, ...rest]: any[]): PlantEntry => ({
      id: kebabCase(first.id),
      contributingCount: rest.length + 1,
      genus: first.plant_genus.trim(),
      cultivar: first.plant_cultivar.trim(),
      category: lowerCase(first.plant_category).trim(),
      contaminants: mapContaminants([first, ...rest]),
      us_hardiness_zone: kebabCase(first.us_hardiness_zone),
      shade: first.shade.trim(),
      soil_type: first.soil_type.trim(),
      soil_ph: first.soil_ph.trim(),
      moisture: first.moisture.trim(),
      height: first.height.trim(),
      species: first.plant_species,
      organic_inorganic: first.organic_or_inorganic,
      phyto_process: first.phyto_process,
      growth_rate: first.growth_rate,
      geography: first.geography,
      seasonal_interest_spring: first.seasonal_interest_spring,
      seasonal_interest_summer: first.seasonal_interest_summer,
      seasonal_interest_fall: first.seasonal_interest_fall,
      seasonal_interest_winter: first.seasonal_interest_winter,
      image: first.plant_image,
    }),
  );
}

function mapContaminants(entries: any[]): ContaminantEntry[] {
  const mapped = entries.map((e): any => ({
    name: e.contaminant.trim(),
    abbreviation: e.contaminant_abbreviation.trim(),
    category: lowerCase(e.contaminant_type.trim()) || "unknown",
    removal_rate: e.removal_rate,
    notes: e.notes,
    tissue_type: e.plant_tissue.trim(),
    title: e.article_title || e.book_title,
    reference: e.article_reference || e.book_reference,
    link: e.article_link || e.book_link,
    reference_type: e.book_title ? "book" : "article",
    mass_kg_m2: e.plant_mass_kg_m_2,
    image: e.contaminant_image,
  }));

  return values(groupBy(mapped, "id"))
    .flatMap((v) => values(groupBy(v, "tissue_type")))
    .map(
      ([first, ...rest]): ContaminantEntry => ({
        id: first.name,
        name: first.name,
        abbreviation: first.abbreviation,
        category: first.category,
        image: first.image,
        removal_rates: [first, ...rest].map(
          (rate): RemovalRateEntry => ({
            removal_rate: Number(rate.removal_rate.trim()),
            notes: rate.notes.trim(),
            reference: {
              title: rate.title,
              reference: rate.reference,
              type: rate.reference_type,
              link: rate.link,
            },
          }),
        ),
        tissue_type: first.tissue_type,
        mass_kg_m2: Number(first.mass_kg_m2 || 0),
      }),
    );
}
