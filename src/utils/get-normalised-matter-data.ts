import { normaliseData } from "./normalise-data";
import { MATTER_DATA } from "../converted-matter";
import { groupBy, uniqBy } from "lodash";

export type ProjectEntry = {
  title: string;
  author: string;
  about: string;
  link: string;
  image: string;
};

export type MatterEntry = {
  id: string;
  vegetation_type: string;
  plant_species: string;
  plant_genus: string;
  common_name: string;
  processing: string;
  material_function: string;
  category: string;
  comment: string;
  projects: ProjectEntry[];
};

export const NORMALISED_MATTER_DATA = getNormalisedMatterData();

function getNormalisedMatterData(): MatterEntry[] {
  const normalised = normaliseData(
    MATTER_DATA,
    (e) => `${e.plant_genus}-${e.category}`,
  );
  const grouped = groupBy(normalised, "id");

  return Object.values(grouped).map(
    ([first, ...rest]): MatterEntry => ({
      id: first.id,
      plant_species: first.plant_species,
      plant_genus: first.plant_genus,
      common_name: first.common_name,
      vegetation_type: first.vegetation_type,
      processing: first.processing
        .toLowerCase()
        .split(",")
        .map((_: string) => _.trim()),
      material_function: first.building_material_function
        .toLowerCase()
        .split(",")
        .map((_: string) => _.trim()),
      category: first.category
        .toLowerCase()
        .split(",")
        .map((_: string) => _.trim()),
      comment: first.comment,
      projects: mapProjects([first, ...rest]),
    }),
  );
}

function mapProjects(entries: any[]): ProjectEntry[] {
  const mapped = entries.map(
    (e): ProjectEntry => ({
      title: e.project_title,
      author: e.project_author,
      link: e.project_link,
      about: e.about_project,
      image: e.material_image,
    }),
  );

  return uniqBy(mapped, "link");
}
