import { groupBy, kebabCase, lowerCase, values } from "lodash";
import { PHYTO_DATA } from "../converted-phyto";
import { normaliseData } from "./normalise-data";

export type ReferenceEntry = {
  title: string;
  reference: string;
  author: string;
  year: string;
  link: string;
};

export type RemovalRateEntry = {
  removal_rate: number;
  reference: ReferenceEntry;
};

export type ContaminantEntry = {
  id: string;
  name: string;
  symbol: string;
  category: string;
  image: string;
  removal_rates: RemovalRateEntry[];
  tissue_type: string;
  mass_kg_m2: number;
};

export type PlantEntry = {
  id: string;
  latin_name: string;
  vegetation_type: string;
  species: string;
  family: string;
  common_name: string;
  organic_inorganic: string;
  phyto_process: string;
  growth_rate: string;
  image: string;
  contaminants: ContaminantEntry[];
  hardiness_zone: string;
  shade: string;
  soil: string;
  moisture: string;
  contributingCount: number;
};

export const NORMALISED_PHYTO_DATA = getNormalisedPhytoData();

function getNormalisedPhytoData() {
  const normalised = normaliseData(PHYTO_DATA, (e) => e.plant_name);

  return Object.values(groupBy(normalised, "id")).map(
    ([first, ...rest]: any[]): PlantEntry => ({
      id: kebabCase(first.id),
      contributingCount: rest.length + 1,
      latin_name: first.plant_name.trim(),
      vegetation_type: lowerCase(first.vegetation_type).trim(),
      common_name: first.common_name.trim(),
      contaminants: mapContaminants([first, ...rest]),
      hardiness_zone: kebabCase(first.hardiness_zone),
      shade: first.shade.trim(),
      soil: first.soil.trim(),
      moisture: first.moisture.trim(),
      species: first.plant_species,
      family: first.plant_family,
      organic_inorganic: first.organic_inorganic,
      phyto_process: first.phyto_process,
      growth_rate: first.growth_rate,
      image: first.plant_image,
    }),
  );
}

function mapContaminants(entries: any[]): ContaminantEntry[] {
  const mapped = entries.map((e): any => ({
    name: e.contaminant.trim(),
    symbol: e.contaminant_symbol.trim(),
    category: lowerCase(e.contaminant_type.trim()) || "unknown",
    removal_rate: e.removal_rate,
    tissue_type: e.plant_tissue.trim(),
    article_title: e.title,
    reference: e.reference,
    first_author: e.first_author,
    publication_year: e.publication_year,
    link: e.reference_link,
    mass_kg_m2: e.plant_mass_kg_m_2,
  }));

  return values(groupBy(mapped, "id"))
    .flatMap((v) => values(groupBy(v, "tissue_type")))
    .map(
      ([first, ...rest]): ContaminantEntry => ({
        id: first.symbol,
        name: first.name,
        symbol: first.symbol,
        category: first.category,
        image: first.contaminant_image,
        removal_rates: [first, ...rest].map(
          (rate): RemovalRateEntry => ({
            removal_rate: Number(rate.removal_rate.trim()),
            reference: {
              title: rate.article_title,
              reference: rate.reference,
              author: rate.first_author,
              year: rate.publication_year,
              link: rate.link,
            },
          }),
        ),
        tissue_type: first.tissue_type,
        mass_kg_m2: Number(first.mass_kg_m2 || 0),
      }),
    );
}
